import posed from 'react-pose';

export default {
  Container: posed.ol({
    active: {
      beforeChildren: false,
      delayChildren: 200,
      staggerChildren: 50,
      opacity: 1,
    },
    inactive: {
      beforeChildren: false,
      delayChildren: 200,
      staggerChildren: 50,
      delay: 180,
      opacity: 0,
    },
  }),

  Column: posed.li({
    active: {
      y: 0,
      beforeChildren: true,
      delayChildren: 200,
      staggerChildren: 50,
      opacity: 1,
    },
    inactive: {
      y: 20,
      delayChildren: 200,
      staggerChildren: 50,
      opacity: 0,
    },
  }),

  Row: posed.div({
    active: { y: 0, opacity: 1 },
    inactive: { y: 10, opacity: 0 },
  }),
};
