const BING_URL = "https://www.bing.com";

function createSession(authCookie) {
  const headers = new Headers({
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "Referrer-Policy": "origin-when-cross-origin",
    referrer: "https://www.bing.com/images/create/",
    origin: "https://www.bing.com",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54",
    cookie: `_U=${authCookie}`,
    "sec-ch-ua": `"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"`,
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
  });

  return headers;
}

async function getImages(headers, prompt) {
  console.log("Sending request...");
  const urlEncodedPrompt = encodeURIComponent(prompt);

  const PROXY_URL = 'https://muffinmode.net:3002/';
  const url = `${PROXY_URL}${BING_URL}/images/create?q=${urlEncodedPrompt}&rt=3&FORM=GENCRE`;
  console.log(url);
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    redirect: 'manual'
  });


  let redirectUrl;
  if (response.status == 200) {
    redirectUrl = response.url.replace("&nfy=1", "");
  } else if (response.status !== 302) {
    console.error(
      `ERROR: the status is ${response.status} instead of 302 or 200`
    );
    throw new Error("Redirect failed");
  }

  console.log("Redirected to", redirectUrl);

  const requestId = redirectUrl.split("id=")[1];
  await fetch(redirectUrl, { headers: headers });

  const pollingUrl = `${BING_URL}/images/create/async/results/${requestId}?q=${urlEncodedPrompt}`;

  console.log("Waiting for results...");
  const startWait = performance.now();
  let imagesResponse;

  while (true) {
    if (performance.now() - startWait > 300000) {
      throw new Error("Timeout error");
    }
    console.log(".", { end: "", flush: true });
    imagesResponse = await fetch(pollingUrl, { headers: headers });
    if (imagesResponse.status === 200) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    const imagesData = await imagesResponse.json();
    const images = imagesData.images.map(image => image.url);
  
    return images;
  }
  
  async function generateImages(prompt) {
    const authCookie = '1GRT5TdSBNPGJ76QveYFjq1RACugASW7u6ohGmQxGKngbZ_VmiF4bBA9II3FXcRYXCyvZ1pQJFFa4kWoIiauFq1JTTd77Jy_1Tl60tt_L43-kYFQDCsqZWru9Lzz3Rb2GPNKSwixhJmFRQL8Qeq1l5v_z9YsroZp07HTVhG0Bo9wFtf_5AU1FQeW6KvBAOjYF6ZiBckabqRlfSh5CkmpwkAzdtMqGQVDQGAJPSZGAX9E'; // replace with your actual auth cookie
    const headers = createSession(authCookie);
    const images = await getImages(headers, prompt);
    console.log(images);
  }

  