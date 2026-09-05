import { 
  GenerationInput, 
  AdvertisementResult, 
  InstagramResult, 
  WhatsAppResult, 
  ReelScriptResult, 
  CalendarDayItem, 
  PosterResult,
  GenerationContentResult 
} from '@/types';

// Structured generation dispatcher
export async function generateMarketingContent(input: GenerationInput): Promise<GenerationContentResult> {
  // Simulate AI latency for realistic SaaS feel (1.5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const isTamil = input.language === 'Tamil';
  const isBilingual = input.language === 'Tamil + English';
  
  const busName = input.businessName || 'Business';
  const busType = input.businessType || 'Local Store';
  const product = input.productService || 'Services';
  const offer = input.offerDiscount || 'Special Discount Available!';
  const location = input.location || 'Your City';
  const cta = input.callToAction || (isTamil ? 'இப்போதே வாருங்கள் / தொடர்பு கொள்ளுங்கள்!' : 'Call or Visit Us Today!');

  switch (input.contentType) {
    case 'advertisement':
      return generateAdvertisement(input, isTamil, isBilingual, busName, busType, product, offer, location, cta);

    case 'instagram':
      return generateInstagram(input, isTamil, isBilingual, busName, busType, product, offer, location, cta);

    case 'whatsapp':
      return generateWhatsApp(input, isTamil, isBilingual, busName, busType, product, offer, location, cta);

    case 'reel_script':
      return generateReelScript(input, isTamil, isBilingual, busName, busType, product, offer, location, cta);

    case 'calendar':
      return generateContentCalendar(input, isTamil, isBilingual, busName, busType, product, offer);

    case 'poster':
      return generatePosterContent(input, isTamil, isBilingual, busName, busType, product, offer, location, cta);

    default:
      throw new Error(`Unsupported content type: ${input.contentType}`);
  }
}

// 1. ADVERTISEMENT GENERATOR
function generateAdvertisement(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  offer: string, 
  location: string, 
  cta: string
): AdvertisementResult {
  if (isTamil) {
    return {
      headline: `🔥 ${busName}-இல் சிறப்பு சலுகை! உங்கள் ${busType} தேவைகளுக்கு சிறந்த இடம்!`,
      subheadline: `${product} சேவைகளில் இப்போது பிரம்மாண்ட ${offer}`,
      mainAd: `வணக்கம்! ${location}-இல் செயல்படும் நமது ${busName} உங்களை அன்போடு வரவேற்கிறது!

நீங்கள் மிகச்சிறந்த ${product} சேவையை தேடுகிறீர்களா? கவலை வேண்டாம்! 

✨ எங்களிடம் கிடைக்கும் சிறப்பம்சங்கள்:
• 100% தரமான மற்றும் நம்பகமான சேவை
• அனுபவம் வாய்ந்த வல்லுநர்கள்
• பட்ஜெட் விலையில் உயர்தர முடிவுகள்

🎁 சிறப்பு திருவிழா சலுகை: ${offer}!
இந்த அரிய வாய்ப்பை தவறவிடாதீர்கள்!`,
      offer: offer,
      cta: `📍 முகவரி: ${location}\n📞 தொடர்புக்கு: 98765 43210 | ${cta}`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, `#${busType.replace(/\s+/g, '')}`, '#LocalBusinessTamil', `#${location.replace(/\s+/g, '')}`, '#SpecialOfferTamil']
    };
  } else if (isBilingual) {
    return {
      headline: `✨ Super Offer at ${busName}! ${busType} Special!`,
      subheadline: `Get ${offer} on all ${product} services in ${location}!`,
      mainAd: `Vanakkam ${location}! 🙏 

Are you looking for the best ${product} near you? ${busName} is here to solve your needs!

🔥 Why choose ${busName}?
✓ Experienced & Friendly Staff
✓ Top-Quality Service Guaranteed
✓ Affordable Pricing with Festival Discounts

🎁 Exclusive Offer: ${offer}!
Ippo Vanga, Semma Offer Allunga! Don't miss out on this limited period deal.`,
      offer: offer,
      cta: `📍 Visit: ${location} | 📞 Contact: 98765 43210 | ${cta}`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, '#TamilEnglishMarketing', '#OfferAlert', `#${location.replace(/\s+/g, '')}`, '#BestService']
    };
  } else {
    return {
      headline: `🚀 Upgrade Your Experience with ${busName} - Exclusive Offer!`,
      subheadline: `Premium ${product} solutions delivered with excellence. Enjoy ${offer}!`,
      mainAd: `Looking for top-tier ${product}? Welcome to ${busName}, your trusted ${busType} in ${location}.

We take pride in offering high-quality solutions tailored to your unique requirements. Whether you are looking for reliability, speed, or incredible value, we have you covered.

🌟 Key Highlights:
• Professional & Reliable Customer Support
• Cutting-Edge Technology & Fast Service
• Transparent Pricing with Zero Hidden Costs

🎉 Special Promotion: ${offer}`,
      offer: offer,
      cta: `📍 Location: ${location} | 📞 Book Now: 98765 43210 | ${cta}`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, `#${busType.replace(/\s+/g, '')}`, '#BusinessGrowth', `#${location.replace(/\s+/g, '')}`, '#LimitedPeriodOffer']
    };
  }
}

// 2. INSTAGRAM GENERATOR
function generateInstagram(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  offer: string, 
  location: string, 
  cta: string
): InstagramResult {
  if (isTamil) {
    return {
      hook: `🛑 நில்லுங்கள்! ${location}-இல் நீங்கள் இன்னும் ${busName}-க்கு வரவில்லையா? 😱`,
      caption: `நமது ${busName}-இல் தற்போது ${product} சேவைகளுக்கு அதிரடி சலுகை நடைபெறுகிறது! 🔥

உங்கள் தேவைகளை பூர்த்தி செய்ய நாங்கள் எப்போதும் தயார்! 

👉 ${offer}
👉 100% திருப்தி உத்திரவாதம்
👉 சிறந்த வாடிக்கையாளர் சேவை

இப்போதே பயோ (Bio) லிங்கை கிளிக் செய்து முன்பதிவு செய்யுங்கள் அல்லது நேரடி செய்தி (DM) அனுப்புங்கள்! 📩`,
      mainContent: `நமது ${busName}-இல் தற்போது ${product} சேவைகளுக்கு அதிரடி சலுகை நடைபெறுகிறது! 🔥`,
      cta: `👉 Like & Share this post with your friends! Save for later! 📌`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, '#InstaTamil', '#TamilBusiness', `#${location.replace(/\s+/g, '')}`, '#TrendingTamil', '#ShopLocal'],
      emojis: ['🔥', '✨', '🎁', '📍', '📞', '💯']
    };
  } else if (isBilingual) {
    return {
      hook: `Stop Scrolling! 🛑 ${location} Makkale, check out this amazing offer at ${busName}! 👇`,
      caption: `Looking for premium ${product}? ${busName} brings you the ultimate deal! 🤩

✨ Offer Details: ${offer}!
📍 Spot Location: ${location}

Neenga enna wait panreenga? DM us right now to claim this special offer or tap the link in bio! 📲`,
      mainContent: `Looking for premium ${product}? ${busName} brings you the ultimate deal! 🤩`,
      cta: `💬 DM us "OFFER" to get instant booking link!`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, '#InstaReels', '#TanglishContent', `#${location.replace(/\s+/g, '')}`, '#OfferAlert', '#LocalBiz'],
      emojis: ['🛑', '🤩', '🎁', '💥', '📲', '✨']
    };
  } else {
    return {
      hook: `Transform your daily routine with ${busName}! ✨ Here is what you need to know...`,
      caption: `Quality, excellence, and affordability — all under one roof at ${busName}! 🌟

We are excited to announce our latest deal on ${product}. 

💡 Why our customers love us:
- Industry-leading standards
- Personalized approach
- Unbeatable discount: ${offer}

Ready to elevate your experience? Tap the link in bio or drop a comment below! 👇`,
      mainContent: `Quality, excellence, and affordability — all under one roof at ${busName}! 🌟`,
      cta: `📌 Save this post & Share with someone who needs this!`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, `#${busType.replace(/\s+/g, '')}`, '#SmallBusiness', '#SpecialDeal', `#${location.replace(/\s+/g, '')}`],
      emojis: ['✨', '🌟', '💡', '📌', '👇', '🚀']
    };
  }
}

// 3. WHATSAPP GENERATOR
function generateWhatsApp(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  offer: string, 
  location: string, 
  cta: string
): WhatsAppResult {
  let msg = '';
  if (isTamil) {
    msg = `🔥 *கவனிக்கவும்! ${busName} வழங்கும் சிறப்பு சலுகை!* 🔥

வணக்கம்! நமது *${busName}* (${busType}) சார்பாக உங்களுக்கு ஒரு மகிழ்ச்சியான செய்தி!

🎉 *சிறப்பு சலுகை వివరங்கள்:*
👉 *${product}* சேவைகளுக்கு *${offer}*!

🌟 *ஏன் எங்களை தேர்ந்தெடுக்க வேண்டும்?*
• 100% நம்பகமான சேவை
• அனுபவமிக்க வல்லுநர்கள்
• மிகக்குறைந்த கட்டணம்

📍 *முகவரி:* ${location}
📞 *தொடர்புகொள்ள / முன்பதிவு செய்ய:* 98765 43210

தாமதிக்காதீர்கள்! சலுகை குறைந்த நாட்களுக்கு மட்டுமே! 🏃‍♂️💨
${cta}`;
  } else if (isBilingual) {
    msg = `🔥 *ATTENTION ${location.toUpperCase()} MAKKALE!* 🔥

*${busName}* brings you an exciting offer you cannot resist! 🥳

🎁 *Special Offer:*
👉 *${offer}* on all *${product}* orders/services!

📍 *Location:* ${location}
📞 *Contact / WhatsApp:* 98765 43210

Ippo call panni unga slot-a book pannunga! Offer ending soon! ⏳
${cta}`;
  } else {
    msg = `🔥 *SPECIAL PROMOTION FROM ${busName.toUpperCase()}!* 🔥

Hello! Thank you for choosing *${busName}* (${busType}). We are excited to present our exclusive limited-time deal!

🎁 *Special Discount:*
👉 *${offer}* on *${product}*!

📍 *Location:* ${location}
📞 *Phone / WhatsApp:* +91 98765 43210
🌐 *Website:* ${input.businessName.toLowerCase().replace(/\s+/g, '')}.com

Don't miss out on this premium offer. Contact us today to reserve your spot! 🚀
${cta}`;
  }

  return {
    formattedMessage: msg,
    rawText: msg.replace(/\*/g, '')
  };
}

// 4. REEL SCRIPT GENERATOR
function generateReelScript(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  offer: string, 
  location: string, 
  cta: string
): ReelScriptResult {
  const duration = input.reelDuration || '30s';

  const scenes = isTamil ? [
    {
      sceneNumber: 1,
      name: 'Hook (0-5s)',
      visual: `கேமராவுக்கு முன்னால் யோசித்துக்கொண்டிருக்கும் நபர், 'என்னது ${location}-இல் இவ்வளவு கம்மி விலையா?' என்ற டெக்ஸ்ட் கார்டு வர வேண்டும்.`,
      voiceover: `நீங்களும் ${location}-இல் தரமான ${product} தேடி சலிச்சு போயிட்டீங்களா?`
    },
    {
      sceneNumber: 2,
      name: 'Problem (5-10s)',
      visual: `அதிக விலை மற்றும் தரமில்லாத சேவைகளால் விரக்தியடையும் காட்சிகள்.`,
      voiceover: `அதிக பணம் கொடுத்தும் திருப்தியான சேவை கிடைக்கலையா? கவலைப்படாதீங்க!`
    },
    {
      sceneNumber: 3,
      name: 'Solution (10-20s)',
      visual: `${busName} கடை/மையத்தின் அழகான காட்சிகள், அங்கு வழங்கப்படும் நவீன ${product} சேவைகள் காட்சிப்படுத்தல்.`,
      voiceover: `இதோ உங்களுக்காக ${busName}! இங்க உயர்தர ${product} மிகச்சிறந்த அனுபவத்துடன் உங்களுக்கு கிடைக்கிறது!`
    },
    {
      sceneNumber: 4,
      name: 'Offer (20-25s)',
      visual: `திரையில் பெரிய எழுத்துக்களில் ${offer} என்ற சலுகை பேனர் பளிச்சிட வேண்டும்.`,
      voiceover: `அதுமட்டுமில்ல, இப்போ வந்தீங்கன்னா ${offer} சிறப்பு தள்ளுபடியும் உண்டு!`
    },
    {
      sceneNumber: 5,
      name: 'CTA (25-30s)',
      visual: `கடையின் முகவரி (${location}) மற்றும் போன் நம்பர் திரையில் காண்பிக்கப்பட்டு, கை சுட்டிக்காட்டும் அனிமேஷன்.`,
      voiceover: `இப்போவே கீழ இருக்கிற நம்பருக்கு கால் பண்ணுங்க அல்லது நேரா ${busName}-க்கு வாங்க!`
    }
  ] : [
    {
      sceneNumber: 1,
      name: 'Hook (0-5s)',
      visual: `Fast-paced zoom-in shot of a frustrated customer or text overlay: "Tired of finding good ${product} in ${location}?"`,
      voiceover: `Stop wasting your money on sub-par ${product} in ${location}!`
    },
    {
      sceneNumber: 2,
      name: 'Problem (5-10s)',
      visual: `Quick cut showing common struggles (high cost, long wait times, poor quality).`,
      voiceover: `Most places charge heavy prices without guaranteeing true quality.`
    },
    {
      sceneNumber: 3,
      name: 'Solution (10-20s)',
      visual: `Bright aesthetic b-roll of ${busName} welcoming customers, showcasing pristine setup and happy clients.`,
      voiceover: `That is why ${busName} is changing the game with top-rated ${product} services!`
    },
    {
      sceneNumber: 4,
      name: 'Offer (20-25s)',
      visual: `Dynamic text animation popping up: "${offer}" with celebration emojis.`,
      voiceover: `And right now, you can lock in our exclusive discount: ${offer}!`
    },
    {
      sceneNumber: 5,
      name: 'CTA (25-30s)',
      visual: `Show store storefront, location tag (${location}), and call-to-action button animation pointing to Bio.`,
      voiceover: `Tap the link in our bio or call us today to claim your discount before it expires!`
    }
  ];

  return {
    title: `${busName} - Short-Form Marketing Reel Script (${duration})`,
    duration: duration,
    scenes: scenes,
    suggestedBgm: 'Upbeat Trending Afrobeat / Commercial Tech Pop BGM'
  };
}

// 5. CONTENT CALENDAR GENERATOR
function generateContentCalendar(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  offer: string
): CalendarDayItem[] {
  const count = parseInt(input.calendarDuration || '7', 10);
  const items: CalendarDayItem[] = [];

  const platforms: ('Instagram' | 'WhatsApp' | 'Facebook' | 'Poster' | 'Reel')[] = [
    'Instagram', 'WhatsApp', 'Reel', 'Poster', 'Facebook', 'Instagram', 'WhatsApp'
  ];

  const topicTemplates = isTamil ? [
    { type: 'அறிமுகம்', topic: `${busName}-இன் சிறப்பு அறிமுகம்`, caption: `எங்கள் ${busName}-இல் உங்கள் ${product} தேவைகளுக்கு சிறந்த தீர்வு கிடைக்கும்!`, cta: 'இப்போதே வாருங்கள்!' },
    { type: 'வாடிக்கையாளர் மதிப்புரை', topic: 'உண்மையான வாடிக்கையாளர்கள் கருத்து', caption: `எங்கள் சேவையை பற்றி எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள் என்று பாருங்கள்!`, cta: 'இன்றே அனுபவியுங்கள்!' },
    { type: 'சலுகை அறிவிப்பு', topic: `${offer} சிறப்பு தள்ளுபடி`, caption: `குறைந்த கால சலுகை! ${offer} பெற்று மகிழுங்கள்.`, cta: 'உடனே போன் செய்யுங்கள்!' },
    { type: 'வீடியோ ரீல்', topic: `${product} பயன்பாடுகள் - ரீல்ஸ்`, caption: `எப்படி நாங்கள் தரமான சேவை வழங்குகிறோம் என்று இந்த வீடியோவில் பாருங்கள்!`, cta: 'Follow பின்தொடருங்கள்!' },
    { type: 'போஸ்டர் / பேனர்', topic: 'வார இறுதி சிறப்பு தள்ளுபடி', caption: `இந்த வார இறுதியில் ${busName}-க்கு வருகை தரும் அனைவருக்கும் சிறப்பு பரிசு!`, cta: 'விஜயம் செய்யுங்கள்!' },
    { type: 'கேள்வி பதில்', topic: `${busType} பற்றிய சந்தேகங்கள்`, caption: `உங்களுக்கு ${product} பற்றி ஏதேனும் சந்தேகங்கள் உள்ளதா? கருத்து தெரிவிங்கள்!`, cta: 'Comment செய்யுங்கள்!' },
    { type: 'நன்றி பதிவு', topic: 'எங்கள் அன்பான வாடிக்கையாளர்களுக்கு நன்றி', caption: `நாங்கள் வெற்றி நடைபோட காரணமான உங்களுக்கு மனமார்ந்த நன்றிகள்!`, cta: 'தொடர்ந்து இணைந்திருங்கள்!' }
  ] : [
    { type: 'Brand Showcase', topic: `Introducing ${busName}`, caption: `Discover why ${busName} is ${input.location || 'the city'}'s favorite ${busType}!`, cta: 'Visit Us Today' },
    { type: 'Customer Review', topic: 'Client Testimonial Spotlight', caption: `"Best experience ever!" See what our happy customers have to say about our ${product}.`, cta: 'Book Your Slot' },
    { type: 'Offer Blast', topic: `Special Promo: ${offer}`, caption: `Don't miss out! Get ${offer} on all orders this week.`, cta: 'Claim Offer Now' },
    { type: 'Behind The Scenes Reel', topic: `How we deliver top ${product}`, caption: `Take a quick peek behind the scenes at ${busName}!`, cta: 'Save & Share' },
    { type: 'Educational / Tip', topic: `5 Reasons You Need Quality ${product}`, caption: `Did you know? Choosing the right ${busType} can save you time and money.`, cta: 'Read More' },
    { type: 'Interactive Story/Poll', topic: 'Which service do you prefer?', caption: `Drop your answer in the comments below! We'd love to hear from you.`, cta: 'Comment Below' },
    { type: 'Weekly Recap', topic: 'Weekend Special at ' + busName, caption: `Finish your week strong with our exclusive weekend deal!`, cta: 'Call Now' }
  ];

  for (let i = 1; i <= count; i++) {
    const templateIndex = (i - 1) % topicTemplates.length;
    const template = topicTemplates[templateIndex];
    items.push({
      dayNumber: i,
      platform: platforms[(i - 1) % platforms.length],
      contentType: template.type,
      topic: template.topic,
      caption: template.caption,
      cta: template.cta
    });
  }

  return items;
}

// 6. POSTER CONTENT GENERATOR
function generatePosterContent(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  offer: string, 
  location: string, 
  cta: string
): PosterResult {
  const style = input.posterStyle || 'Modern';

  if (isTamil) {
    return {
      headline: busName.toUpperCase(),
      subheadline: `${busType} & ${product}`,
      offer: `🔥 ${offer} 🔥`,
      bodyText: `உயர்தர சேவை • குறைந்த கட்டணம் • நம்பகத்தன்மை! இன்றே வருகை தாருங்கள்.`,
      dateBadge: input.posterDate || 'சிறப்பு திருவிழா சலுகை!',
      contactText: `📞 தொடர்புக்கு: 98765 43210`,
      locationText: `📍 ${location}`,
      style: style,
      bgColor: '#0f172a',
      accentColor: '#6366f1'
    };
  } else {
    return {
      headline: busName.toUpperCase(),
      subheadline: `PREMIUM ${busType.toUpperCase()}`,
      offer: offer,
      bodyText: `Experience world-class ${product} tailored to perfection. Special limited-time promotion!`,
      dateBadge: input.posterDate || 'SPECIAL OFFER VALID THIS MONTH',
      contactText: `📞 Call Us: +91 98765 43210`,
      locationText: `📍 Location: ${location}`,
      style: style,
      bgColor: '#0f172a',
      accentColor: '#6366f1'
    };
  }
}
