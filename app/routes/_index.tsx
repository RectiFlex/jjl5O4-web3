import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Smart Contract Auditing`,
      description: `Get your smart contracts thoroughly audited by industry experts to ensure maximum security and reliability.`,
      icon: <i className="las la-shield-alt"></i>,
    },
    {
      heading: `Tokenomics Advisory`,
      description: `Optimize your token economics with data-driven insights and expert guidance from seasoned professionals.`,
      icon: <i className="las la-chart-pie"></i>,
    },
    {
      heading: `Marketing Support`,
      description: `Reach your target audience effectively with our comprehensive marketing strategies and tools.`,
      icon: <i className="las la-bullhorn"></i>,
    },
    {
      heading: `Community Building`,
      description: `Build and engage a thriving community around your project with our proven community management tools.`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Investor Network`,
      description: `Get direct access to our curated network of qualified Web3 investors and VCs.`,
      icon: <i className="las la-handshake"></i>,
    },
    {
      heading: `Launch Analytics`,
      description: `Track your launch performance with real-time analytics and actionable insights.`,
      icon: <i className="las la-chart-line"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Alex Chen`,
      designation: `Founder, DeFi Protocol`,
      content: `The Web3 Launchpad was instrumental in our successful token launch. Their expert guidance helped us raise $2.5M in under 48 hours.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Sarah Williams`,
      designation: `CEO, GameFi Startup`,
      content: `The investor network and marketing support we received were game-changing. Our community grew 10x within weeks of launch.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Kumar`,
      designation: `CTO, NFT Marketplace`,
      content: `Their smart contract audit saved us from potential vulnerabilities. The peace of mind was worth every penny.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Basic Launch`,
      description: `Perfect for early-stage Web3 projects`,
      monthly: 999,
      yearly: 9999,
      features: [
        `Smart Contract Audit`,
        `Basic Marketing Support`,
        `Community Management Tools`,
      ],
    },
    {
      title: `Pro Launch`,
      description: `Comprehensive launch support for serious projects`,
      monthly: 2999,
      yearly: 29999,
      features: [
        `Everything in Basic`,
        `Tokenomics Advisory`,
        `Investor Network Access`,
        `Premium Marketing Support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large-scale launches`,
      monthly: 4999,
      yearly: 49999,
      features: [
        `Everything in Pro`,
        `Dedicated Launch Manager`,
        `Custom Marketing Strategy`,
        `VIP Investor Introductions`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How long does the launch process typically take?`,
      answer: `The average launch process takes 4-6 weeks, including audit, marketing preparation, and community building.`,
    },
    {
      question: `What kind of projects do you accept?`,
      answer: `We accept innovative Web3 projects across DeFi, GameFi, NFTs, and other blockchain verticals that pass our due diligence process.`,
    },
    {
      question: `How do you ensure project security?`,
      answer: `We partner with leading security firms for smart contract audits and conduct thorough background checks on all projects.`,
    },
    {
      question: `What's your success rate?`,
      answer: `Projects launching through our platform have a 78% success rate in reaching their funding goals, compared to the industry average of 25%.`,
    },
  ]

  const steps = [
    {
      heading: `Submit Your Project`,
      description: `Complete our comprehensive application form and undergo initial screening.`,
    },
    {
      heading: `Due Diligence`,
      description: `Our experts review your project's technical architecture, tokenomics, and team background.`,
    },
    {
      heading: `Launch Preparation`,
      description: `Receive full launch support including audits, marketing, and community building.`,
    },
    {
      heading: `Successful Launch`,
      description: `Go live with confidence and ongoing support from our team.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😰`,
      title: `Struggling to navigate complex launch requirements`,
    },
    {
      emoji: `💸`,
      title: `Losing potential investors due to lack of credibility`,
    },
    {
      emoji: `😤`,
      title: `Wasting time and resources on failed launches`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Launch Your Web3 Project with Confidence`}
        subtitle={`Join the platform that has helped launch over 200+ successful Web3 projects with $100M+ raised`}
        buttonText={`Start Your Launch`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/jjl5O4-web3-KElx`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={200}
            suffixText={`successful launches`}
          />
        }
      />
      <LandingSocialProof title={`Featured on`} />
      <LandingPainPoints
        title={`70% of Web3 projects fail due to poor launch execution - Don't be one of them`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to a Successful Launch`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need for a Successful Launch`}
        subtitle={`Comprehensive tools and support to make your Web3 project stand out`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories from Founders Like You`}
        subtitle={`Join hundreds of successful projects that launched with us`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Launch Packages Designed for Your Success`}
        subtitle={`Choose the perfect launch package for your project`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Launching`}
        subtitle={`Everything you need to know about launching your Web3 project`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Launch Your Web3 Project?`}
        subtitle={`Join the platform trusted by successful founders`}
        buttonText={`Start Your Launch`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
