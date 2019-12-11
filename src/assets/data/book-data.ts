import { IBook } from "src/app/services/book/book.service";

export const emptyIBook = {
  id: "",
  title: "",
  pageCount: 0,
  description: "",
  categories: [],
  publishedDate: ""
};

export const mockBooks: IBook[] = [
  {
    id: "HRAoDwAAQBAJ",
    title: "Watermelon",
    favourite: true,
    publishedDate: "2017-07-06",
    description:
      "Never before has this title been published as an eBook . . . Watermelon, Marian Keyes's very first novel, tells the extremely funny and wonderfully touching tale of a woman who thought she had it all - until the day she discovers that it's all gone . . . 'Failed relationships can be describe as so much wasted makeup . . .' On the day she gives birth to her first child, Claire Walsh's husband James tells her he's been having an affair and now's the right time to leave her. Right for who exactly? Exhausted, tearful and a tiny bit furious, Claire can't think of what to do. So she follows the instincts of all self-respecting adults in tricky situations. . . . And runs home to Mum and Dad. But while her parents are sympathetic, Claire's younger sisters are less so. Helen wants to share the new toy (she means baby Kate). While Anna is too busy having out-of her-head experiences. So when James slips back into her life, desperate to put things right, Claire doesn't know whether to take a chance on a past she feared she'd lost forever or face an uncertain future of her own. But is she as on her own as she really believes? 'A warm and hilarious page turner' Good Housekeeping 'Reading a novel by Marian Keyes is like sitting at the kitchen table with your nicest, most confiding friend.' Daily Mail 'Gloriously funny' The Sunday Times 'Funny but poignant' Marie Claire 'When it comes to writing page-turners that put a smile on your face and make you think, Keyes is in a class of her own' Daily Express",

    pageCount: 544,
    categories: ["Fiction"],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=HRAoDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=HRAoDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  },
  {
    id: "ML3_9m6LVhAC",
    favourite: true,
    title: "Close the Door Softly As You Go",
    publishedDate: "1982-01-01",
    pageCount: 880,
    description:
      "This book offers a beautiful series of stories reflecting transitions of life, emotional maturation and its gifts. Every time we grow to a new understanding, we die a little to the old, so life becomes many deaths, the closing of many doors.The wise person is one who walks through each new doorway to a new life, letting the old one close behind without regret, or despair, or clinging hold.Whatever your problem may be, know that the same one has been met and conquered by someone, with bravery and with understanding. Facing the problem and overcoming it will make you a better, happier person because by that effort, you will release your Imprisoned Splendor.",

    categories: ["Body, Mind & Spirit"],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=ML3_9m6LVhAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=ML3_9m6LVhAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  },
  {
    id: "mbaEAgAAQBAJ",
    favourite: true,
    title: "Brain Mystery Light and Dark",
    publishedDate: "2006-06-07",
    description:
      "Brain Mystery Light and Dark examines scientific models of how the brain becomes conscious and argues that the spiritual dimension of life is compatible with the main scientific theories. Keyes shows us that the belief in the unity of mind and brain does not necessarily undermine aesthetic, religious, and ethical beliefs.",
    pageCount: 184,
    categories: ["Philosophy"]
  },
  {
    id: "RBlADwAAQBAJ",
    favourite: true,
    title: "The Lion and the Unicorn",
    publishedDate: "2018-01-25",
    description:
      "George Orwell's moving reflections on the English character and his passionate belief in the need for political change. The Lion and the Unicorn was written in London during the worst period of the blitz. It is vintage Orwell, a dynamic outline of his belief in socialism, patriotism and an English revolution. His fullest political statement, it has been described as 'one of the most moving and incisive portraits of the English character' and is as relevant now as it ever has been.",

    pageCount: 128,
    categories: ["Literary Collections"],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=RBlADwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=RBlADwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  },
  {
    id: "BjSbO-pY5t8C",
    favourite: true,
    title: "Nineteen Eighty-Four",
    publishedDate: "2004-01-29",
    description:
      "The classic novel about a man trying to be himself in a totalitarian world.",

    pageCount: 325,
    categories: ["Fiction"]
  },
  {
    id: "axwKsXldFvkC",
    favourite: true,
    title: "Animal Farm",
    publishedDate: "2010",
    description:
      "Tells of a revolution that went wrong when the animals drive Mr Jones off his farm and attempt to run it themselves.",

    pageCount: 114,
    categories: ["Allegories"],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=axwKsXldFvkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=axwKsXldFvkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  },
  {
    id: "vaDa9gd1IqEC",
    favourite: true,
    title: "Nineteen Eighty-Four (1984)",
    publishedDate: "2012-06-21",
    description:
      "War is Peace. Freedom is Slavery. Ignorance is Strength. Winston Smith rewrites history for the Ministry of Truth, but when he’s handed a note that says simply ‘I love you’ by a woman he hardly knows, he decides to risk everything in a search for the real truth. In a world where cheap entertainment keeps the proles ignorant but content, where a war without end is always fought and the government is always watching, can Winston possibly hold onto what he feels inside? Or will he renounce everything, accept the Party’s reality and learn to love Big Brother? ‘Dunster – both in his faithful take on the story and in his sometimes extreme but always enthralling adaptation – gets close to the heart of Orwell’s warning, pointing up but not overemphasising its current political resonances.... Newspeak, Doublethink, Room 101 and Thought Police take on a chilling reality in this compelling production.’ – The Independent",

    pageCount: 120,
    categories: ["Drama"],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=vaDa9gd1IqEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=vaDa9gd1IqEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  },
  {
    id: "5vX_CCb_JWQC",
    favourite: true,
    title: "The Play of George Orwell's Animal Farm",
    publishedDate: "1993",
    description:
      "This is a powerful, fast-moving dramatisation of George Orwell's classic satire, Animal Farm. The script is fresh, funny and immensely enjoyable without in any way jeopardising the savagery of the original novel.",
    pageCount: 143,
    categories: ["Animals"],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=5vX_CCb_JWQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=5vX_CCb_JWQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  }
];
