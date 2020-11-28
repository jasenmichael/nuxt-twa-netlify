export default (meta, siteData) => {
  const type = "website";
  const url = siteData.url;
  const title = siteData.name
  const description = siteData.description
  const mainImage = "/v.png"
  return [{
    //   hid: "description",
      name: "description",
      content: (meta && meta.description) || description,
    },
    {
    //   hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image"
      // content: "summary"
    },
    {
    //   hid: "twitter:url",
      name: "twitter:url",
      content: (meta && meta.url) || url,
    },
    {
    //   hid: "twitter:title",
      name: "twitter:title",
      content: (meta && meta.title) || title,
    },
    {
    //   hid: "twitter:description",
      name: "twitter:description",
      content: (meta && meta.description) || description,
    },
    {
    //   hid: "twitter:image",
      name: "twitter:image",
      content: (meta && meta.mainImage) ? url + meta.mainImage : url + mainImage,
    },
    {
    //   hid: "og:type",
      property: "og:type",
      content: type,
    },
    {
    //   hid: "og:url",
      property: "og:url",
      content: (meta && meta.url) || url,
    },
    {
    //   hid: "og:title",
      property: "og:title",
      content: (meta && meta.title) || title,
    },
    {
    //   hid: "og:description",
      property: "og:description",
      content: (meta && meta.description) || description,
    },
    {
    //   hid: "og:image",
      property: "og:image",
      content: (meta && meta.mainImage) || mainImage,
    },
  ];
};
