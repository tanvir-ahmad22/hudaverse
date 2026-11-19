# Web Container Alignment Audit

Base URL: `http://localhost:3000`  
Viewports: 1440, 1024, 768, 390, 1920px  
Pass threshold: each left and right content edge is within 1 CSS px of the visible navbar content edge.

| Route | Width | Element | Navbar edge (L / R) | Element edge (L / R) | Result |
|---|---:|---|---:|---:|---|
| / | 1440 | Everything You Need to Know, Understand & Learn Islam. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| / | 1440 | Your Journey Through Islamic Knowledge | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| / | 1440 | Ask about Islam. Understand with evidence. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| / | 1440 | Questions, clearly answered. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| / | 1440 | Your Journey Of Faith, Knowledge & Growth Starts Here | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| / | 1440 |  | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| / | 1024 | Everything You Need to Know, Understand & Learn Islam. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| / | 1024 | Your Journey Through Islamic Knowledge | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| / | 1024 | Ask about Islam. Understand with evidence. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| / | 1024 | Questions, clearly answered. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| / | 1024 | Your Journey Of Faith, Knowledge & Growth Starts Here | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| / | 1024 |  | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| / | 768 | Everything You Need to Know, Understand & Learn Islam. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| / | 768 | Your Journey Through Islamic Knowledge | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| / | 768 | Ask about Islam. Understand with evidence. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| / | 768 | Questions, clearly answered. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| / | 768 | Your Journey Of Faith, Knowledge & Growth Starts Here | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| / | 768 |  | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| / | 390 | Everything You Need to Know, Understand & Learn Islam. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| / | 390 | Your Journey Through Islamic Knowledge | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| / | 390 | Ask about Islam. Understand with evidence. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| / | 390 | Questions, clearly answered. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| / | 390 | Your Journey Of Faith, Knowledge & Growth Starts Here | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| / | 390 |  | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| / | 1920 | Everything You Need to Know, Understand & Learn Islam. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| / | 1920 | Your Journey Through Islamic Knowledge | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| / | 1920 | Ask about Islam. Understand with evidence. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| / | 1920 | Questions, clearly answered. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| / | 1920 | Your Journey Of Faith, Knowledge & Growth Starts Here | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| / | 1920 |  | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1440 | Start with one word. See how deep it goes. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | Discover what HudaVerse can do for you. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | One Question. A Complete Picture. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | One verse, many layers of understanding. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | Your Work, Kept Together. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | Ask a verse what it means, and where it leads. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | Trust, but check: every source should be within reach. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 | From Fajr to Isha, Knowledge Walks With You. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1440 |  | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /explore | 1024 | Start with one word. See how deep it goes. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | Discover what HudaVerse can do for you. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | One Question. A Complete Picture. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | One verse, many layers of understanding. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | Your Work, Kept Together. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | Ask a verse what it means, and where it leads. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | Trust, but check: every source should be within reach. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 | From Fajr to Isha, Knowledge Walks With You. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 1024 |  | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /explore | 768 | Start with one word. See how deep it goes. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | Discover what HudaVerse can do for you. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | One Question. A Complete Picture. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | One verse, many layers of understanding. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | Your Work, Kept Together. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | Ask a verse what it means, and where it leads. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | Trust, but check: every source should be within reach. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 | From Fajr to Isha, Knowledge Walks With You. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 768 |  | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /explore | 390 | Start with one word. See how deep it goes. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | Discover what HudaVerse can do for you. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | One Question. A Complete Picture. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | One verse, many layers of understanding. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | Your Work, Kept Together. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | Ask a verse what it means, and where it leads. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | Trust, but check: every source should be within reach. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 | From Fajr to Isha, Knowledge Walks With You. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 390 |  | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /explore | 1920 | Start with one word. See how deep it goes. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | Discover what HudaVerse can do for you. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | One Question. A Complete Picture. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | One verse, many layers of understanding. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | Your Work, Kept Together. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | Ask a verse what it means, and where it leads. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | Trust, but check: every source should be within reach. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 | From Fajr to Isha, Knowledge Walks With You. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /explore | 1920 |  | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1440 | A Connected Journey Through Islamic Knowledge. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | A Note From the Founder | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | Why HudaVerse Exists | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | Our Vision & Mission | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | Our Philosophy | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | A Connected Islamic Knowledge Ecosystem | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | Our Commitment | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | A Vision Started by One. A Journey for the Ummah. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | A Journey of Knowledge. A Future of Understanding. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | Beyond a Vision, Toward a Lasting Benefit. | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 | Important Principle | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1440 |  | 40.0 / 1400.0 | 40.0 / 1400.0 | PASS |
| /about | 1024 | A Connected Journey Through Islamic Knowledge. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | A Note From the Founder | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | Why HudaVerse Exists | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | Our Vision & Mission | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | Our Philosophy | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | A Connected Islamic Knowledge Ecosystem | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | Our Commitment | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | A Vision Started by One. A Journey for the Ummah. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | A Journey of Knowledge. A Future of Understanding. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | Beyond a Vision, Toward a Lasting Benefit. | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 | Important Principle | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 1024 |  | 24.0 / 1000.0 | 24.0 / 1000.0 | PASS |
| /about | 768 | A Connected Journey Through Islamic Knowledge. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | A Note From the Founder | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | Why HudaVerse Exists | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | Our Vision & Mission | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | Our Philosophy | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | A Connected Islamic Knowledge Ecosystem | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | Our Commitment | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | A Vision Started by One. A Journey for the Ummah. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | A Journey of Knowledge. A Future of Understanding. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | Beyond a Vision, Toward a Lasting Benefit. | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 | Important Principle | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 768 |  | 20.0 / -20.0 | 20.0 / 748.0 | FAIL |
| /about | 390 | A Connected Journey Through Islamic Knowledge. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | A Note From the Founder | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | Why HudaVerse Exists | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | Our Vision & Mission | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | Our Philosophy | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | A Connected Islamic Knowledge Ecosystem | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | Our Commitment | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | A Vision Started by One. A Journey for the Ummah. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | A Journey of Knowledge. A Future of Understanding. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | Beyond a Vision, Toward a Lasting Benefit. | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 | Important Principle | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 390 |  | 12.0 / -12.0 | 12.0 / 378.0 | FAIL |
| /about | 1920 | A Connected Journey Through Islamic Knowledge. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | A Note From the Founder | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | Why HudaVerse Exists | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | Our Vision & Mission | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | Our Philosophy | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | A Connected Islamic Knowledge Ecosystem | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | Our Commitment | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | A Vision Started by One. A Journey for the Ummah. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | A Journey of Knowledge. A Future of Understanding. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | Beyond a Vision, Toward a Lasting Benefit. | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 | Important Principle | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |
| /about | 1920 |  | 48.0 / 1872.0 | 48.0 / 1872.0 | PASS |

Result: 54 failures across 135 measurements.
