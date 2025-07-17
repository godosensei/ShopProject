const elements = [
  // 1
  `book1`,
  `book2`,
  `shoes1`,
  `shoes2`,
  `bag1`,
  // 2
  `glasses1`,
  `shoes3`,
  `bag2`,
  `glasses2`,
  `glasses3`,
  // 3
  `bag3`,
  `book4`,
  `shoes4`,
  `book5`,
  `book6`,
  // 4
  `shoes5`,
  `shoes6`,
  `glasses4`,
  `glasses5`,
  `glasses6`,
  // 5
  `glasses7`,
  `shoes7`,
  `shoes8`,
  `shoes9`,
];

let pages = [];

// function pagination(take, page) {
//   const total = elements.length;
//   const totalPages = Math.ceil(total / take);
//   let skip = 0;
//   let skiparr = [];

//   if (page != 0) {
//     page = page - 1;
//   }

//   for (let i = 0; i < totalPages; i++) {
//     const start = i * take;
//     const end = start + take;
//     // pages[`page${i + 1}`] = elements.slice(start, end);
//     pages.push(elements.slice(start, end));
//   }
//   //   skip
//   for (let i = 0; i < page; i++) {
//     const start = i * take;
//     const end = start + take;
//     skiparr.push(elements.slice(start, end));
//     skiparr = skiparr.flat();
//     skip = skiparr.length;
//   }

//   return { pages, curr: pages[page], skip };
// }

function pagination(take, page) {
  const totalElems = elements.length;
  let skip = Math.max(0, take * (page - 1));
  const totalPages = Math.ceil(totalElems / take);
  const items = elements.slice(skip, skip + take);
  let remainingPages = totalPages - page;

  return {
    totalElements: totalElems,
    take: take,
    currentPage: Math.max(1, page),
    totalPages: totalPages,
    remainingPages: Math.max(remainingPages, 0),
    skip: skip,
    itemsOnCurrPage: items,
  };
}

console.log(pagination(5, 2));
