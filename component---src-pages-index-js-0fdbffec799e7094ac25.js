(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[678],{7361:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#d8d8d8","images":{"fallback":{"src":"/static/97d762109af3ca2d3c1fa32a8725714e/d24ee/profile-pic.jpg","srcSet":"/static/97d762109af3ca2d3c1fa32a8725714e/d24ee/profile-pic.jpg 50w,\\n/static/97d762109af3ca2d3c1fa32a8725714e/64618/profile-pic.jpg 100w","sizes":"50px"},"sources":[{"srcSet":"/static/97d762109af3ca2d3c1fa32a8725714e/d4bf4/profile-pic.avif 50w,\\n/static/97d762109af3ca2d3c1fa32a8725714e/ee81f/profile-pic.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/97d762109af3ca2d3c1fa32a8725714e/3faea/profile-pic.webp 50w,\\n/static/97d762109af3ca2d3c1fa32a8725714e/6a679/profile-pic.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')},9535:function(e,t,a){"use strict";var l=a(7294),i=a(5444),r=a(3217);t.Z=function(){var e,t,c=(0,i.useStaticQuery)("3257411868"),n=null===(e=c.site.siteMetadata)||void 0===e?void 0:e.author;null===(t=c.site.siteMetadata)||void 0===t||t.social;return l.createElement("div",{className:"bio"},l.createElement(r.S,{className:"bio-avatar",layout:"fixed",formats:["AUTO","WEBP","AVIF"],src:"../images/profile-pic.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(7361)}),(null==n?void 0:n.name)&&l.createElement("p",null,"Written by ",l.createElement("strong",null,n.name)," ",(null==n?void 0:n.summary)||null," ",l.createElement("a",{href:"https://github.com/codejaeger/myweblogs"},"You can star this on Github to get updates.")))}},7704:function(e,t,a){"use strict";a.r(t);var l=a(7294),i=a(5444),r=a(9535),c=a(7198),n=a(3751);t.default=function(e){var t,a=e.data,s=e.location,o=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",d=a.allMarkdownRemark.nodes;return 0===d.length?l.createElement(c.Z,{location:s,title:o},l.createElement(n.Z,{title:"All posts"}),l.createElement(r.Z,null),l.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):l.createElement(c.Z,{location:s,title:o},l.createElement(n.Z,{title:"All posts"}),l.createElement(r.Z,null),l.createElement("ol",{style:{listStyle:"none"}},d.map((function(e){var t=e.frontmatter.title||e.fields.slug;return l.createElement("li",{key:e.fields.slug},l.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",null,l.createElement("h2",null,l.createElement(i.Link,{to:e.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},t))),l.createElement("small",null,e.frontmatter.date)),l.createElement("section",null,l.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-0fdbffec799e7094ac25.js.map