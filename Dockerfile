# Verwende das AWS Lambda Runtime Image für Node.js 22
FROM public.ecr.aws/lambda/nodejs:22
# Arbeitsverzeichnis setzen
WORKDIR /var/task

# Kopiere package.json und package-lock.json (falls vorhanden)
COPY package.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes
COPY index.js ./

# Standard-Handler setzen
CMD ["index.handler"]

ENV MY_ENV_VAR="Hello from Docker"