FROM node:10

WORKDIR /app

COPY package*.json ./

COPY . ./

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install

# Dependencies + NodeJS
# RUN apt-get -qq update && \
#   echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections && \
#   apt-get -y -qq install software-properties-common &&\
#   apt-add-repository "deb http://archive.canonical.com/ubuntu $(lsb_release -sc) partner" && \
#   apt-add-repository ppa:malteworld/ppa && apt-get -qq update && apt-get -y -qq install \
#   adobe-flashplugin \
#   msttcorefonts \
#   fonts-noto-color-emoji \
#   fonts-noto-cjk \
#   fonts-liberation \
#   fonts-thai-tlwg \
#   fonts-indic \
#   fontconfig \
#   libappindicator3-1 \
#   pdftk \
#   unzip \
#   locales \
#   gconf-service \
#   libasound2 \
#   libatk1.0-0 \
#   libc6 \
#   libcairo2 \
#   libcups2 \
#   libdbus-1-3 \
#   libexpat1 \
#   libfontconfig1 \
#   libgcc1 \
#   libgconf-2-4 \
#   libgdk-pixbuf2.0-0 \
#   libglib2.0-0 \
#   libgtk-3-0 \
#   libnspr4 \
#   libpango-1.0-0 \
#   libpangocairo-1.0-0 \
#   libstdc++6 \
#   libx11-6 \
#   libx11-xcb1 \
#   libxcb1 \
#   libxcomposite1 \
#   libxcursor1 \
#   libxdamage1 \
#   libxext6 \
#   libxfixes3 \
#   libxi6 \
#   libxrandr2 \
#   libxrender1 \
#   libxss1 \
#   libxtst6 \
#   ca-certificates \
#   libappindicator1 \
#   libnss3 \
#   lsb-release \
#   xdg-utils \
#   wget \
#   xvfb \
#   curl &&\
#   # Fonts
#   fc-cache -f -v

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# # Install Chrome Stable when specified
# RUN if [ "$USE_CHROME_STABLE" = "true" ]; then \
#     cd /tmp &&\
#     wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb &&\
#     dpkg -i google-chrome-stable_current_amd64.deb;\
#   fi

# # Build
# RUN if [ "$USE_CHROME_STABLE" = "true" ]; then \
#     export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true;\
#   fi &&\
#   npm install -g typescript @types/node &&\
#   npm install &&\
#   npm run post-install &&\
#   npm run build

# Cleanup
RUN apt-get -qq clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Add user
RUN groupadd -r blessuser && useradd -r -g blessuser -G audio,video blessuser \
  && mkdir -p /home/blessuser/Downloads \
  && chown -R blessuser:blessuser /home/blessuser \
  && chown -R blessuser:blessuser /app

# Run everything after as non-privileged user.
USER blessuser

# Expose the web-socket and HTTP ports
EXPOSE 8080
ENTRYPOINT ["dumb-init", "--"]

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#     && apt-get update \
#     && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
#       --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

#     # Add user so we don't need --no-sandbox.
#     # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
# RUN npm install puppeteer
# RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser 
# RUN mkdir -p /home/pptruser/Downloads 
# RUN chown -R pptruser:pptruser /home/pptruser 
# # RUN chown pptruser:pptruser /app/node_modules/puppeteer/.local-chromium/mac-672088/chrome-mac/
# RUN chown -R pptruser:pptruser /app

# USER pptruser

# EXPOSE 8080

ENV NAME World

# RUN cd /app/node_modules/puppeteer/.local-chromium/mac-672088/chrome-mac/ \
#     chown root:root chrome_sandbox \
#     chmod 4755 chrome_sandbox \
#     # copy sandbox executable to a shared location
#     cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox \
#     # export CHROME_DEVEL_SANDBOX env variable
#     export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox

CMD ["npm", "start"]