server {
        listen 80;
        listen [::]:80;

        root /home/events-spa/www/EventsApp-SPA/web-ui/build;

        index index.html;

        server_name events-spa.sukhmansingh.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
