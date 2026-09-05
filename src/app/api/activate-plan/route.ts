import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting map (IP address -> attempts array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_ATTEMPTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = rateLimitMap.get(ip) || [];
  
  // Filter out attempts outside time window
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  
  if (recentAttempts.length >= MAX_ATTEMPTS_PER_WINDOW) {
    return true;
  }
  
  recentAttempts.push(now);
  rateLimitMap.set(ip, recentAttempts);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Too many attempts. Please wait 1 minute before trying again.' 
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { plan, code } = body || {};

    if (!plan || !code || typeof code !== 'string') {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Invalid activation code. Please check your code and try again.' 
        },
        { status: 400 }
      );
    }

    // Secure server-side secret codes (NEVER exposed to frontend JS)
    const starterSecret = process.env.STARTER_ACTIVATION_CODE || '10971';
    const growthSecret = process.env.GROWTH_ACTIVATION_CODE || '5623';
    const proBusinessSecret = process.env.PRO_BUSINESS_ACTIVATION_CODE || 'HB6778';

    const normalizedCode = code.trim();
    let expectedCode = '';

    if (plan === 'starter') {
      expectedCode = starterSecret.trim();
    } else if (plan === 'growth') {
      expectedCode = growthSecret.trim();
    } else if (plan === 'pro_business') {
      expectedCode = proBusinessSecret.trim();
    } else {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Invalid activation code. Please check your code and try again.' 
        },
        { status: 400 }
      );
    }

    // Strict plan-specific code verification
    const isValid = normalizedCode === expectedCode;

    if (!isValid) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Invalid activation code. Please check your code and try again.' 
        },
        { status: 400 }
      );
    }

    // Successful activation response
    return NextResponse.json({
      valid: true,
      plan: plan,
      activatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        valid: false, 
        message: 'Invalid activation code. Please check your code and try again.' 
      },
      { status: 500 }
    );
  }
}
