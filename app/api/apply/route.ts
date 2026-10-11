import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendRegistrationEmails } from "@/lib/email";
import { formatRollNumber } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      mobile,
      city,
      address,
      qualification,
      passoutYear,
      currentStatus,
      selectedCourse,
      leadSource,
      referralName,
    } = body;

    if (!fullName || !email || !mobile) {
      return NextResponse.json(
        { error: "Full Name, Email, and Mobile number are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Calculate Next Roll Number
    const { data: maxApp } = await supabase
      .from("student_applications")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextId = (maxApp?.id || 0) + 1;
    const assignedRollNum = 1200 + nextId;
    const formattedRoll = formatRollNumber(assignedRollNum);

    // 2. Insert into student_applications
    const { data, error } = await supabase
      .from("student_applications")
      .insert([
        {
          full_name: fullName.trim(),
          email: cleanEmail,
          mobile: mobile.trim(),
          city: city?.trim() || "Online",
          address: address?.trim() || "",
          qualification: qualification || "Graduate",
          passout_year: passoutYear || "",
          current_status: currentStatus || "Fresher",
          selected_course: selectedCourse || "Software Testing Masters",
          lead_source: leadSource || "Website",
          referral_name: referralName?.trim() || "",
          roll_number: formattedRoll,
          status: "Pending",
          screening_status: "Pending Test",
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // 3. Dispatch automated registration confirmation email
    try {
      await sendRegistrationEmails({
        fullName: fullName.trim(),
        email: cleanEmail,
        mobile: mobile.trim(),
        qualification: qualification || "Graduate",
        currentStatus: currentStatus || "Fresher",
        address: city?.trim() || "",
        leadSource: leadSource || "Website",
        selectedCourse: selectedCourse || "Software Testing Masters",
        referralName: referralName?.trim(),
        rollNumber: formattedRoll,
      });
    } catch (mailErr) {
      console.error("Email notification error:", mailErr);
    }

    return NextResponse.json({
      success: true,
      rollNumber: formattedRoll,
      applicationId: data.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error submitting application";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
