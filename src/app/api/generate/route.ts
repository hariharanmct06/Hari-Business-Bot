import { NextRequest, NextResponse } from 'next/server';
import { generateMarketingContent } from '@/lib/ai-engine';
import { GenerationInput } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: GenerationInput = await req.json();

    if (!body.businessName || !body.contentType) {
      return NextResponse.json(
        { error: 'Invalid input. Business name and content type are required.' },
        { status: 400 }
      );
    }

    // Call server-side AI service generator
    const result = await generateMarketingContent(body);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('AI Generation API error:', error);
    return NextResponse.json(
      { error: error.message || 'AI content generation failed. Please try again.' },
      { status: 500 }
    );
  }
}
