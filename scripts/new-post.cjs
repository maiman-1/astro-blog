const fs = require("fs");
const FILE_PATH = './src/pages/blog/posts/';


function main() {
  // create new file
  // get today's date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  const file_name = `${FILE_PATH}${dateStr}-post.md`;

  // set content based on date
  const content = `---
layout: "./../../../layouts/PostLayout.astro"
title:  "New Post"
pubDate:   ${dateStr}
description: 'PlaceHolder description for new post'
author: 'Muhammad Aiman Shamsiemon'
image:
    url: "/astro-blog/favicon.png"
    alt: 'The full Astro logo.'
tags: []
draft: false
---
`

  console.log(`Creating new file: ${file_name}`);

  // check if file exists 
  // not necessary use flag wx
  // create new file
  var fd = fs.openSync(file_name, 'wx');
  fs.writeSync(fd, content);
  fs.closeSync(fd);
}

if (require.main === module) main();
