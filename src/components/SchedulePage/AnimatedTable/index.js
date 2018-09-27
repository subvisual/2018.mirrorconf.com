import posed from 'react-pose';

export default {
  Container: posed.ol({
    active: {
      opacity: 1,
      beforeChildren: false,
      delayChildren: 200,
      staggerChildren: 50,
    },
    inactive: {
      opacity: 0.5,
      beforeChildren: false,
      delayChildren: 200,
      staggerChildren: 50,
      delay: 180,
    },
  }),

  Column: posed.li({
    active: {
      y: 0,
      opacity: 1,
      beforeChildren: true,
      delayChildren: 200,
      staggerChildren: 50,
    },
    inactive: {
      y: 20,
      opacity: 0,
      delayChildren: 200,
      staggerChildren: 50,
    },
  }),

  Row: posed.div({
    active: { y: 0, opacity: 1 },
    inactive: { y: 10, opacity: 0 },
  }),
};
