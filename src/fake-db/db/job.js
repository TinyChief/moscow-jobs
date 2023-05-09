import Mock from "../mock";
const jobs = [
  {
    id: 1,
    title: "Clinical Specialist",
    description: "Donec vitae nisi.",
    company: "Larson Inc",
    preview: "http://dummyimage.com/136x100.png/5fa2dd/ffffff",
  },
  {
    id: 2,
    title: "Desktop Support Technician",
    description:
      "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
    company: "Conn-Sporer",
    preview: "http://dummyimage.com/163x100.png/5fa2dd/ffffff",
  },
  {
    id: 3,
    title: "Professor",
    description:
      "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    company: "Kihn and Sons",
    preview: "http://dummyimage.com/175x100.png/ff4444/ffffff",
  },
  {
    id: 4,
    title: "Human Resources Assistant III",
    description:
      "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
    company: "O'Reilly, Parisian and Keebler",
    preview: "http://dummyimage.com/186x100.png/ff4444/ffffff",
  },
  {
    id: 5,
    title: "Analyst Programmer",
    description:
      "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    company: "Wilderman, Dickens and Roberts",
    preview: "http://dummyimage.com/101x100.png/ff4444/ffffff",
  },
  {
    id: 6,
    title: "Director of Sales",
    description:
      "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    company: "Lakin-O'Hara",
    preview: "http://dummyimage.com/170x100.png/dddddd/000000",
  },
  {
    id: 7,
    title: "Speech Pathologist",
    description:
      "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    company: "Wolf, Koelpin and Wisozk",
    preview: "http://dummyimage.com/161x100.png/dddddd/000000",
  },
  {
    id: 8,
    title: "Junior Executive",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    company: "Gerlach Inc",
    preview: "http://dummyimage.com/229x100.png/ff4444/ffffff",
  },
  {
    id: 9,
    title: "Chemical Engineer",
    description:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
    company: "Ullrich Group",
    preview: "http://dummyimage.com/180x100.png/ff4444/ffffff",
  },
  {
    id: 10,
    title: "Desktop Support Technician",
    description: "Aenean auctor gravida sem.",
    company: "Boehm-Ortiz",
    preview: "http://dummyimage.com/243x100.png/cc0000/ffffff",
  },
];

Mock.onGet("/api/jobs").reply(async () => {
  try {
    return [200, { jobs }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet(/\/api\/jobs\/\d+/).reply((config) => {
  // the actual id can be grabbed from config.url
  const parts = config.url.split("/");
  const id = +parts[parts.length - 1];
  console.log(id);

  const job = jobs.find((el) => el.id === id);

  if (!job) return [404, "no such job"];

  return [200, { job }];
});
