
const server = Bun.serve({
  port: 7695,
  async fetch(req: Request) {
    const url = new URL(req.url);
    try {
      if (url.pathname === '/sms-webhook') {
        const formData = await req.formData();
        const messageSid = formData.get('MessageSid');
        const from = formData.get('From');
        const body = formData.get('Body');

        console.log(`Received SMS [${messageSid}] \n
        from ${from}: ${body}`);
        
        const twimlResponse = `
          <Response>
            <Message>Thank you for your message.</Message>
          </Response>
        `;
        return new Response(twimlResponse, { headers: { 'Content-Type': 'text/xml' } });
      }
      return new Response('Not Found', { status: 404 });
    } catch(e) {
      console.error(e);
      return new Response('Bad Bad Request', { status: 400 });
    }
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);