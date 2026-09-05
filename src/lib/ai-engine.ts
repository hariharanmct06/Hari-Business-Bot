import { 
  GenerationInput, 
  AdvertisementResult, 
  InstagramResult, 
  WhatsAppResult, 
  ReelScriptResult, 
  CalendarDayItem, 
  PosterResult,
  GrowthIdeasResult,
  SingleGrowthIdea,
  WeeklyPlanItem,
  SeoEngineResult,
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

    case 'growth_ideas':
      return generateGrowthIdeas(input, isTamil, isBilingual, busName, busType, product, location);

    case 'seo_engine':
      return generateSeoEngine(input, isTamil, isBilingual, busName, busType, product, location);

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
    const isHariBot = busName.toLowerCase().includes('hari bot');
    return {
      headline: isHariBot 
        ? `🔥 Hari Bot & Business Solutions – உங்கள் வணிக வளர்ச்சிக்கான AI & Digital Marketing சேவைகள்!`
        : `🔥 ${busName}-இல் சிறப்பு அறிவிப்பு! உங்கள் ${busType} தேவைகளுக்கான சிறந்த இடம்!`,
      subheadline: isHariBot
        ? `உயர்தர AI & Digital Marketing தீர்வுகளுடன் உங்கள் தொழிலை அடுத்த கட்டத்திற்கு கொண்டு செல்லுங்கள்!`
        : `${product} சேவைகளில் இப்போது சிறப்பான ${offer}`,
      mainAd: isHariBot
        ? `வணக்கம்! ${location}-இல் செயல்படும் நமது ${busName} உங்களை அன்போடு வரவேற்கிறது!

உங்கள் வணிகத்தை வேகமாக வளர்க்க AI & Digital Marketing சேவைகளை தேடுகிறீர்களா?

✨ எங்களிடம் கிடைக்கும் சேவைகள்:
• AI Marketing Content & Strategy
• Instagram & Social Media Campaign Growth
• WhatsApp Marketing Automation
• 100% நம்பகமான உயர்தர டிஜிட்டல் வளர்ச்சி சேவைகள்`
        : `வணக்கம்! ${location}-இல் செயல்படும் நமது ${busName} உங்களை அன்போடு வரவேற்கிறது!

நீங்கள் மிகச்சிறந்த ${product} சேவையை தேடுகிறீர்களா? கவலை வேண்டாம்! 

✨ எங்களிடம் கிடைக்கும் சிறப்பம்சங்கள்:
• 100% தரமான மற்றும் நம்பகமான சேவை
• அனுபவம் வாய்ந்த வல்லுநர்கள்
• பட்ஜெட் விலையில் உயர்தர முடிவுகள்`,
      offer: isHariBot ? `AI & Digital Marketing Services` : offer,
      cta: `📍 முகவரி: ${location}\n📞 தொடர்புக்கு: 8667808803`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, '#AIDigitalMarketing', '#BusinessGrowthTamil', `#${location.replace(/\s+/g, '')}`, '#DigitalMarketingTamil']
    };
  } else if (isBilingual) {
    return {
      headline: `✨ Hari Bot & Business Solutions - AI & Digital Marketing Services!`,
      subheadline: `Grow your business with premium AI & Digital Marketing solutions in ${location}!`,
      mainAd: `Vanakkam ${location}! 🙏 

Are you looking to scale your business using AI & Digital Marketing? Hari Bot & Business Solutions is here to accelerate your growth!

🔥 Why choose Hari Bot & Business Solutions?
✓ 100% Result-Oriented Digital Marketing
✓ Advanced AI Marketing Automation
✓ Tailored Strategies for Local Business Success`,
      offer: `AI & Digital Marketing Services`,
      cta: `📍 Visit: ${location} | 📞 Contact: 8667808803`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, '#TamilEnglishMarketing', '#AIDigitalMarketing', `#${location.replace(/\s+/g, '')}`, '#BestService']
    };
  } else {
    return {
      headline: `🚀 Scale Your Business with Hari Bot & Business Solutions!`,
      subheadline: `Premium AI & Digital Marketing solutions delivered with excellence.`,
      mainAd: `Looking for top-tier AI & Digital Marketing? Welcome to ${busName}, your trusted marketing partner in ${location}.

We take pride in offering high-quality growth solutions tailored to your unique business requirements.

🌟 Key Highlights:
• Professional & Reliable Strategy Support
• Cutting-Edge AI Technology & Fast Execution
• Transparent Services for Maximum ROI`,
      offer: `AI & Digital Marketing Services`,
      cta: `📍 Location: ${location} | 📞 Book Now: 8667808803`,
      hashtags: [`#${busName.replace(/\s+/g, '')}`, `#${busType.replace(/\s+/g, '')}`, '#BusinessGrowth', `#${location.replace(/\s+/g, '')}`, '#AIDigitalMarketing']
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
📞 *தொடர்புகொள்ள / முன்பதிவு செய்ய:* 8667808803

தாமதிக்காதீர்கள்! இன்றே தொடர்பு கொள்ளுங்கள்! 🏃‍♂️💨
${cta}`;
  } else if (isBilingual) {
    msg = `🔥 *ATTENTION ${location.toUpperCase()} MAKKALE!* 🔥

*${busName}* brings you premier AI & Digital Marketing services! 🥳

🎁 *Special Services:*
👉 *${product}* for business growth!

📍 *Location:* ${location}
📞 *Contact / WhatsApp:* 8667808803

Ippo call panni unga slot-a book pannunga! ⏳
${cta}`;
  } else {
    msg = `🔥 *SPECIAL PROMOTION FROM ${busName.toUpperCase()}!* 🔥

Hello! Thank you for choosing *${busName}* (${busType}). We are excited to present our growth solutions!

🎁 *Special Services:*
👉 *${product}*!

📍 *Location:* ${location}
📞 *Phone / WhatsApp:* 8667808803
🌐 *Website:* ${input.businessName.toLowerCase().replace(/\s+/g, '')}.com

Contact us today to grow your business! 🚀
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
      contactText: `📞 தொடர்புக்கு: 8667808803`,
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
      contactText: `📞 Call Us: 8667808803`,
      locationText: `📍 Location: ${location}`,
      style: style,
      bgColor: '#0f172a',
      accentColor: '#6366f1'
    };
  }
}

// 7. BUSINESS GROWTH IDEAS GENERATOR
function generateGrowthIdeas(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  location: string
): GrowthIdeasResult {
  const selectedCat = input.selectedCategory || 'Business Ideas';
  const challenges = input.currentChallenges || 'Scaling local customer acquisition and brand visibility';
  const budget = input.marketingBudget || 'Low Budget';

  // 3 Highest-Priority Actions
  const topRecommendedActions = isTamil ? [
    `1️⃣ WhatsApp Business Automation: ${busName} வாடிக்கையாளர்களுக்கு தானியங்கி சலுகை மற்றும் Follow-up செய்திகளை அனுப்பவும்.`,
    `2️⃣ Local Google Business Profile Optimization: ${location}-இல் உள்ள வாடிக்கையாளர்கள் எளிதில் தேட Google Maps-இல் 5-Star Reviews பெறவும்.`,
    `3️⃣ Reel & Short-Form Video Content: ${product} சேவைகளின் நன்மைகளை விளக்கி வாரத்திற்கு 3 ரீல்ஸ் வீடியோக்கள் வெளியிடவும்.`
  ] : [
    `1️⃣ Instant WhatsApp Lead Automation: Setup automated reply & catalog sharing on WhatsApp for every new lead inquiring about ${product}.`,
    `2️⃣ Google Maps & Local SEO Push: Optimize ${busName} on Google Business Profile to capture high-intent local search queries in ${location}.`,
    `3️⃣ High-Impact Reel Campaigns: Publish 3 weekly short-form video reels highlighting customer transformation and before/after proofs.`
  ];

  // 30-Day Growth Plan
  const thirtyDayPlan: WeeklyPlanItem[] = isTamil ? [
    {
      weekNumber: 1,
      title: 'வார 1: அடித்தளம் & டிஜிட்டல் அமைப்புகள் (Foundation)',
      actionItems: [
        `Google Business Profile பக்கம் அமைத்து ${location}-இல் லொகேஷன் மேப் பின் செய்யவும்.`,
        `WhatsApp Business கணக்கில் ${product} விபரங்கள் அடங்கிய Catalog சேர்க்கவும்.`,
        `${busName} சோஷியல் மீடியா கணக்குகளின் பயோ (Bio) மற்றும் தொடர்பு எண்களை சரிபார்க்கவும்.`
      ]
    },
    {
      weekNumber: 2,
      title: 'வார 2: உள்ளடக்க உருவாக்கம் (Content Production)',
      actionItems: [
        `3 குறுகிய ரீல்ஸ் (Reels) வீடியோக்கள் பதிவு செய்து வெளியிடவும்.`,
        `நிறைவான சேவை பெற்ற 5 வாடிக்கையாளர்களிடம் Google 5-Star Review பெறவும்.`,
        `சிறப்பு விளம்பர போஸ்டர் ஒன்றை தயாரித்து வாட்ஸ்அப் ஸ்டேட்டஸில் பகிரவும்.`
      ]
    },
    {
      weekNumber: 3,
      title: 'வார 3: வாடிக்கையாளர் ஈர்ப்பு & சலுகைகள் (Engagement)',
      actionItems: [
        `பழைய வாடிக்கையாளர்களுக்கு ரீ-என்ஃகேஜ்மென்ட் (Re-engagement) மெசேஜ் அனுப்பவும்.`,
        `நண்பர்களை பரிந்துரைக்கும் (Refer-a-Friend) திட்டத்தை அறிமுகப்படுத்தவும்.`,
        `உள்ளூர் வாட்ஸ்அப் குழுக்களில் பிரத்யேக சலுகை செய்திகளை பகிரவும்.`
      ]
    },
    {
      weekNumber: 4,
      title: 'வார 4: மதிப்பீடு & அடுத்தகட்ட வளர்ச்சி (Scale)',
      actionItems: [
        `கடந்த 3 வாரங்களில் அதிக வரவேற்பு பெற்ற விளம்பரங்களை கண்டறியவும்.`,
        `அதிக வாடிக்கையாளர்களை ஈர்த்த உள்ளடக்கத்தை மீண்டும் புதுப்பித்து வெளியிடவும்.`,
        `அடுத்த மாதத்திற்கான 30-நாள் மார்க்கெட்டிங் காலண்டரை இறுதி செய்யவும்.`
      ]
    }
  ] : [
    {
      weekNumber: 1,
      title: 'Week 1: Digital Foundation & Automation Setup',
      actionItems: [
        `Claim and optimize ${busName} on Google Business Profile with location tags for ${location}.`,
        `Configure WhatsApp Business with instant automated greeting & catalog for ${product}.`,
        `Audit Instagram & Facebook profiles ensuring clear CTAs and contact details.`
      ]
    },
    {
      weekNumber: 2,
      title: 'Week 2: Content Engine & Local Proof',
      actionItems: [
        `Produce and schedule 3 high-converting short video reels demonstrating ${product}.`,
        `Collect 5 genuine 5-star Google reviews from satisfied recent customers.`,
        `Launch a broadcast campaign to existing contacts sharing key business updates.`
      ]
    },
    {
      weekNumber: 3,
      title: 'Week 3: Outreach & Partnership Campaign',
      actionItems: [
        `Initiate a Customer Referral Incentive ("Refer a friend and get priority perks").`,
        `Partner with 2 complementary non-competing local businesses in ${location} for cross-promotion.`,
        `Run a targeted weekly offer post across social media channels.`
      ]
    },
    {
      weekNumber: 4,
      title: 'Week 4: Review, Refine & Scale Strategy',
      actionItems: [
        `Analyze which content generated the highest inquiries and calls.`,
        `Double down on top-performing post formats and refine CTA messaging.`,
        `Finalize the content strategy and campaign pipeline for the upcoming month.`
      ]
    }
  ];

  // 12 Highly Relevant Practical Growth Ideas
  const ideas: SingleGrowthIdea[] = [
    {
      id: 'idea_01',
      ideaName: '🚀 Local VIP Loyalty & Referral Club',
      category: 'Business Ideas',
      explanation: 'Create a simple digital referral pass where existing customers get exclusive perks when they introduce friends.',
      whyItHelps: `Word-of-mouth is the #1 growth driver for ${busType} in ${location}.`,
      howToImplement: 'Send a formatted WhatsApp reward pass to your top 20 loyal clients inviting them to refer.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'High Impact',
      platform: 'WhatsApp'
    },
    {
      id: 'idea_02',
      ideaName: '📱 Before/After Transformation Reels',
      category: 'Digital Marketing Ideas',
      explanation: 'Record 15-second raw, authentic clips showing customer results or service delivery in action.',
      whyItHelps: 'Short reels build immediate trust and generate 3x higher organic reach on Instagram.',
      howToImplement: 'Use your phone to film 5-second before, process, and outcome shots. Pair with trending BGM.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'High Impact',
      platform: 'Instagram'
    },
    {
      id: 'idea_03',
      ideaName: '🤖 AI WhatsApp Auto-responder & FAQ Bot',
      category: 'AI Ideas',
      explanation: 'Automate customer inquiry replies on WhatsApp so leads get instant answers 24/7.',
      whyItHelps: 'Prevents losing impatient leads during non-business hours.',
      howToImplement: 'Use WhatsApp Business Quick Replies & Auto-Greeting feature configured for common questions.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'High Impact',
      platform: 'WhatsApp'
    },
    {
      id: 'idea_04',
      ideaName: '📈 Google Business Profile 5-Star Campaign',
      category: 'Growth Strategies',
      explanation: 'Systematically collect 20+ Google reviews from happy clients in ${location}.',
      whyItHelps: 'Google prioritizes businesses with higher reviews in local map searches.',
      howToImplement: 'Create a direct Google Review QR code link and place it at checkout or send post-service on WhatsApp.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'High Impact',
      platform: 'Google'
    },
    {
      id: 'idea_05',
      ideaName: '💰 Bundled Value Packages & Subscriptions',
      category: 'Revenue Ideas',
      explanation: `Bundle complementary ${product} items into quarterly or monthly combo deals.`,
      whyItHelps: 'Increases average order value and guarantees predictable recurring revenue.',
      howToImplement: 'Design 3 bundled pricing tiers (Basic, Gold, VIP) with attractive savings badges.',
      difficulty: 'Medium',
      cost: 'Low Cost',
      impact: 'High Impact',
      platform: 'Website'
    },
    {
      id: 'idea_06',
      ideaName: '🎯 "Weekend Special" Flash Campaign',
      category: 'Marketing Campaign Ideas',
      explanation: 'Run a 48-hour limited-time marketing campaign pushed exclusively on Friday mornings.',
      whyItHelps: 'Creates urgency and drives immediate weekend footfall or bookings.',
      howToImplement: 'Post a countdown story on Instagram and send a broadcast message on WhatsApp.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'Medium',
      platform: 'WhatsApp'
    },
    {
      id: 'idea_07',
      ideaName: '🚀 Cross-Promotion with Complementary Local Stores',
      category: 'Business Ideas',
      explanation: `Partner with nearby non-competing shops in ${location} to swap promotional flyers/coupons.`,
      whyItHelps: 'Tap into established customer bases with zero ad spend.',
      howToImplement: 'Approach 2 local partners and offer reciprocal discount cards for their customers.',
      difficulty: 'Medium',
      cost: 'Low Cost',
      impact: 'Medium',
      platform: 'Offline'
    },
    {
      id: 'idea_08',
      ideaName: '📱 Hyper-Local Geo-Targeted Meta Ads',
      category: 'Digital Marketing Ideas',
      explanation: 'Run Instagram/Facebook ads focused strictly within a 3-5 km radius of your location.',
      whyItHelps: 'Eliminates wasted ad spend by showing ads only to people who can actually visit or buy.',
      howToImplement: 'Set radius targeting in Meta Ads Manager with a modest ₹100-200/day budget.',
      difficulty: 'Medium',
      cost: 'Low Cost',
      impact: 'High Impact',
      platform: 'Instagram'
    },
    {
      id: 'idea_09',
      ideaName: '🤖 AI Automated Content Generation Engine',
      category: 'AI Ideas',
      explanation: 'Use HARI BUSINESS BOT to generate monthly captions, scripts, and poster copy in advance.',
      whyItHelps: 'Saves 15+ hours every month while maintaining consistent daily social posting.',
      howToImplement: 'Generate a 30-day Content Calendar and batch create marketing assets every Sunday.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'High Impact',
      platform: 'Website'
    },
    {
      id: 'idea_10',
      ideaName: '📈 Reactivation Campaign for Lapsed Customers',
      category: 'Growth Strategies',
      explanation: 'Reach out to customers who haven\'t purchased in the last 60 days with a personalized message.',
      whyItHelps: 'Re-activating past customers costs 5x less than acquiring brand new ones.',
      howToImplement: 'Export your contact list, filter inactive clients, and send a warm "We miss you" perk.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'High Impact',
      platform: 'WhatsApp'
    },
    {
      id: 'idea_11',
      ideaName: '💰 Festival & Seasonal Campaign Pass',
      category: 'Revenue Ideas',
      explanation: 'Offer pre-booked seasonal passes ahead of upcoming festivals or peak demand periods.',
      whyItHelps: 'Secures upfront cash flow and locks in customer commitments.',
      howToImplement: 'Announce early-bird festival reservations with priority booking benefits.',
      difficulty: 'Medium',
      cost: 'Low Cost',
      impact: 'High Impact',
      platform: 'Instagram'
    },
    {
      id: 'idea_12',
      ideaName: '🎯 "Customer Spotlight" Social Campaign',
      category: 'Marketing Campaign Ideas',
      explanation: 'Feature real customer stories and reviews weekly as authentic social proof.',
      whyItHelps: 'Builds social credibility and encourages tagged customers to share on their stories.',
      howToImplement: 'Design a clean quote template and post customer appreciation stories every Wednesday.',
      difficulty: 'Easy',
      cost: '₹0 (Free)',
      impact: 'Medium',
      platform: 'Instagram'
    }
  ];

  return {
    topRecommendedActions,
    thirtyDayPlan,
    ideas
  };
}

// 8. SEO OPTIMIZATION ENGINE GENERATOR
function generateSeoEngine(
  input: GenerationInput, 
  isTamil: boolean, 
  isBilingual: boolean, 
  busName: string, 
  busType: string, 
  product: string, 
  location?: string
): SeoEngineResult {
  const topic = input.businessName || input.productService || 'Digital Marketing';
  const kw = input.keyword ? input.keyword.trim() : topic;
  const loc = (input.location || location || '').trim();
  const audience = input.targetAudience ? input.targetAudience.trim() : '';

  const clean = (str: string) => str.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const cleanKw = clean(kw) || 'Business';
  const cleanTopic = clean(topic) || 'Marketing';
  const cleanLoc = clean(loc);

  // Generate 5 SEO-Optimized Title Ideas
  let titles: string[] = [];

  if (cleanLoc) {
    titles = [
      `Best ${cleanKw} Services in ${cleanLoc} for Growing Your Business`,
      `Top 10 ${cleanTopic} Solutions in ${cleanLoc} You Should Know`,
      `How to Scale Your Business in ${cleanLoc} Using ${cleanKw}`,
      `Why Local Businesses in ${cleanLoc} Choose ${cleanTopic}`,
      `The Ultimate ${cleanKw} Strategy Guide for ${cleanLoc} Stores`
    ];
  } else {
    titles = [
      `Ultimate Guide to ${cleanKw} for Business Growth & Sales`,
      `10 Proven ${cleanTopic} Strategies That Drive High Conversion`,
      `How to Scale Your Brand Fast with High-Impact ${cleanKw}`,
      `The Secret to Effective ${cleanTopic} and Customer Reach`,
      `5 Essential ${cleanKw} Tips Every Growing Business Needs`
    ];
  }

  // Generate EXACTLY 5 SEO Hashtags (no spaces, starts with #)
  const toTag = (str: string) => '#' + str.replace(/[^a-zA-Z0-9]/g, '');

  const hashtag1 = toTag(cleanTopic) || '#BusinessGrowth';
  const hashtag2 = input.keyword ? toTag(input.keyword) : '#SEOOptimization';
  const hashtag3 = cleanLoc ? toTag(`${cleanLoc}Business`) : '#AIMarketing';
  const hashtag4 = '#DigitalMarketing';
  const hashtag5 = '#SEOTips';

  const hashtags = [hashtag1, hashtag2, hashtag3, hashtag4, hashtag5];

  return {
    titles,
    hashtags
  };
}

