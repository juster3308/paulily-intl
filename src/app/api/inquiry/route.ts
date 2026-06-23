import { NextRequest, NextResponse } from 'next/server';

// ═══════════════════════════════════════════
// PAULILY International — B2B Inquiry API
// Accepts wholesale inquiry form submissions
// ═══════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['companyName', 'contactPerson', 'email', 'country', 'businessType'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // In production, you would:
    // 1. Save to database (e.g. PostgreSQL, MongoDB)
    // 2. Send email notification to wholesale team
    // 3. Send confirmation email to the inquirer
    // 4. Optionally integrate with CRM (e.g. HubSpot, Salesforce)
    // 5. Rate limiting to prevent spam

    // Mock: log inquiry data
    console.log('=== B2B Inquiry Received ===');
    console.log('Company:', body.companyName);
    console.log('Contact:', body.contactPerson);
    console.log('Email:', body.email);
    console.log('Phone:', body.phone);
    console.log('Country:', body.country);
    console.log('Business Type:', body.businessType);
    console.log('Products:', body.productsOfInterest);
    console.log('Volume:', body.estimatedVolume);
    console.log('Notes:', body.additionalNotes);
    console.log('Timestamp:', new Date().toISOString());

    // Generate inquiry ID
    const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Your wholesale inquiry has been received. Our team will respond within 24 business hours.',
    });

  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}