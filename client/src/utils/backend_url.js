const backend_url = new URL(window.location.origin);

backend_url.port=`${process.env.SERVER_PORT || 5000}`;

export default backend_url;

