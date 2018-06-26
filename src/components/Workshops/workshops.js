import MikeOverlay from './pictures/mike-illustration.png';
import MikePicture from './pictures/mike-photo.png';
import AmberOverlay from './pictures/amber-illustration.png';
import AmberPicture from './pictures/amber-photo.png';
import JaredOverlay from './pictures/jared-illustration.png';
import JaredPicture from './pictures/jared-photo.png';
import LeaOverlay from './pictures/lea-illustration.png';
import LeaPicture from './pictures/lea-photo.png';

const WORKSHOPS = [
  {
    picture: MikePicture,
    overlay: MikeOverlay,
    title: 'Design is a Job',
    speakerName: 'Mike Monteiro',
    day: 'Day 1',
    date: 'October 15th - 10AM',
    description: `
      Ask 10 people what a product roadmap is and you will get 10
      different answers! This artifact is an often misunderstood
      component of product development, but an incredibly important
      one to get right. Creating a great one is part art and part
      science. In this session we will talk through the real purpose
      of a roadmap and how it can be used to get the most out of your
      project and team. We'll unpack the key steps in the process such
      as product visioning, themes, prioritization and stakeholder
      buy-in and alignment as well as and shed some light on the tools
      and frameworks that can be used to ensure a successful
      roadmapping effort.`,
  },
  {
    picture: AmberPicture,
    overlay: AmberOverlay,
    title: 'Designing Calm Technology',
    speakerName: 'Amber Case',
    description: `
      The difference between an annoying technology and one that is helpful is how it engages our attention. Calm Technology is a framework for designing ubiquitous devices that engage our attention in an appropriate manner. The aim of Calm Technology is to provide principles that follow the human lifestyle and environment in mind, allowing technology to amplify humanness instead of taking it away.
      This workshop will cover how to use principles of Calm Technology to design the next generation of connected devices. We’ll look at notification styles, compressing information into other senses, and designing for the least amount of cognitive overhead.`,
  },
  {
    picture: LeaPicture,
    overlay: LeaOverlay,
    title: 'CSS in 2018',
    speakerName: 'Lea Verou',
    description: `
      Feeling overwhelmed at the amount of new CSS and SVG features and techniques you keep hearing about?
      Join CSS superstar Lea Verou and “Father of SVG” Chris Lilley in a day jam-packed with CSS and SVG goodness that will not only bring you up to date, it will help you understand all these new features at a deeper level.`,
  },
  {
    picture: JaredPicture,
    overlay: JaredOverlay,
    title: 'Designing for Delight',
    speakerName: 'Jared Spool',
    description: `
      A good design is usable, useful, and effective. A great design delights its users. Explore a framework that brings your users and customers pleasure, flow, and meaning through your work.
      Inspire your organization to go beyond shiny features, with products and services that deliver remarkable delight. Infuse your practices with design principles that focus on the value your team can deliver with a long-term perspective.
      Great designs bring customers pleasure, flow, and meaning through the experiences you deliver.
      Jared’s years of research into what makes great designs has uncovered the secrets of delightful products and services.
    `,
  },
];

export default WORKSHOPS;
