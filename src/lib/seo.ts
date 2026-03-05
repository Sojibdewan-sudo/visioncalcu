export const updateSEO = (page: string) => {
  const seoData: Record<string, { title: string; description: string; schema?: any }> = {
    home: {
      title: "Vision AI Calculator – Free Online Unit Converter & AI Calculator",
      description: "Convert units instantly, use advanced scientific calculator, and solve real-life problems with AI. Free online smart calculator tool.",
    },
    convertor: {
      title: "Free Unit Converter Online – Convert Length, Weight, Temperature",
      description: "Instantly convert between 100+ units across 13 categories including length, weight, temperature, and more.",
    },
    scientific: {
      title: "Scientific Calculator Online – Advanced Math Functions",
      description: "Free online scientific calculator with advanced mathematical functions, trigonometry, logarithms, and more.",
    },
    ai: {
      title: "AI Text Calculator – Solve Math Problems with AI",
      description: "Ask math and financial questions in plain English. Our AI calculator provides step-by-step solutions instantly.",
    },
    age: {
      title: "Free Age Calculator Online – Calculate Exact Age in Years, Months, Days",
      description: "Instantly calculate your exact age from date of birth. Free and accurate age calculator tool.",
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "How to calculate exact age?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your date of birth and the current date in our Age Calculator to get your exact age in years, months, and days."
          }
        }]
      }
    },
    emi: {
      title: "EMI Calculator Online – Loan EMI Calculation Tool",
      description: "Calculate monthly EMI instantly using principal, interest rate, and tenure. Free online EMI calculator.",
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "How is EMI calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EMI is calculated using the formula: P x R x (1+R)^N / [(1+R)^N - 1], where P is Principal, R is monthly interest rate, and N is tenure in months."
          }
        }]
      }
    },
    loan: {
      title: "Loan Calculator Online – Amortization & Interest Breakdown",
      description: "Calculate total payable amount, interest breakdown, and view amortization summary for your loan.",
    },
    'typing-en': {
      title: "Free English Typing Speed Test – Check WPM & Accuracy Online",
      description: "Test your typing speed online. Measure WPM, CPM, and accuracy with customizable time and difficulty levels.",
    },
    'typing-bn': {
      title: "Free Bangla Typing Speed Test – Check WPM & Accuracy Online",
      description: "Test your Bengali typing speed online. Measure WPM, CPM, and accuracy with customizable time and difficulty levels.",
    },
    about: {
      title: "About Us – Vision AI Calculator",
      description: "Learn more about Vision AI Calculator, your all-in-one platform for precise calculations and intelligent problem-solving.",
    },
    terms: {
      title: "Terms & Conditions – Vision AI Calculator",
      description: "Read the terms and conditions for using Vision AI Calculator services.",
    },
    privacy: {
      title: "Privacy Policy – Vision AI Calculator",
      description: "Read our privacy policy to understand how we handle your data.",
    }
  };

  const data = seoData[page] || seoData.home;

  document.title = data.title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', data.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', data.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', data.description);

  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', data.title);

  const twitterDesc = document.querySelector('meta[property="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', data.description);

  // Update Schema
  let schemaScript = document.getElementById('dynamic-schema') as HTMLScriptElement;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  
  if (data.schema) {
    schemaScript.textContent = JSON.stringify(data.schema);
  } else {
    schemaScript.textContent = '';
  }
};
