FROM nginx:alpine

# Copy all project files to NGINX web folder
COPY . /usr/share/nginx/html

# Expose port 8080 (which Google Cloud Run expects by default)
EXPOSE 8080

# Update NGINX to listen on port 8080 instead of 80, then start the server
CMD ["/bin/sh", "-c", "sed -i 's/80/8080/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]