FROM node:10

RUN apt-get update && apt-get install -yq libgconf-2-4

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . ./
# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#     && apt-get update \
#     && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
#       --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

RUN  apt-get update \
     # Install latest chrome dev package, which installs the necessary libs to
     # make the bundled version of Chromium that Puppeteer installs work.
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser 
RUN mkdir -p /home/pptruser/Downloads 
RUN chown -R pptruser:pptruser /home/pptruser 
RUN chown pptruser:pptruser /app/node_modules/puppeteer/.local-chromium/mac-672088/chrome-mac/

USER pptruser

EXPOSE 8080

ENV NAME World

# RUN cd /app/node_modules/puppeteer/.local-chromium/mac-672088/chrome-mac/ \
#     chown root:root chrome_sandbox \
#     chmod 4755 chrome_sandbox \
#     # copy sandbox executable to a shared location
#     cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox \
#     # export CHROME_DEVEL_SANDBOX env variable
#     export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox

CMD ["npm", "start"]