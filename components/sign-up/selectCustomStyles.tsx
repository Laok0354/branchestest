
const customStyles = {
    control: (styles : string[]) => ({
      ...styles,
      backgroundColor: '#272932',
      border: 'none',
      borderRadius : '0.375rem',
      color: '#B5B2B2',
      height: '3rem',
      width: '20rem',
      padding: '0.2rem',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      letterSpacing: '0.01em',
      '&:hover': {
        borderColor: '#6366F1',
      },
    }),
    placeholder: (styles : string[]) => ({
      ...styles,
      color: '#B5B2B2',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      letterSpacing: '0.01em',
    }),
    multiValue: (styles : string[]) => ({
      ...styles,
      backgroundColor: '#272932',
      color: '#F3F4F6',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      letterSpacing: '0.01em',
      marginBottom: '0.5rem',
    }),
    multiValueLabel: (styles : string[]) => ({
      ...styles,
      color: '#F3F4F6',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      letterSpacing: '0.01em',
    }),
    multiValueRemove: (styles : string[]) => ({
        ...styles,
        color: '#F3F4F6',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.25rem',
        letterSpacing: '0.01em',
        '&:hover': {
            backgroundColor: '#35039F',
            color: '#F3F4F6',
        },
    }),
    option: (styles : string[]) => {
        return {
            ...styles,
            backgroundColor: '#0D1117',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.25rem',
            letterSpacing: '0.01em',
            '&:hover': {
            backgroundColor: '#35039F',
            color: '#F3F4F6',
            },
        };
    },
    menu: (styles : string[]) => ({
      ...styles,
      backgroundColor: '#0D1117',
      color: '#F3F4F6',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      letterSpacing: '0.01em',
      maxheight: '10rem',
      overflow: 'auto'
    }),
  };
  
 export default customStyles; 