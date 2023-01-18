import React, { useEffect, useState } from 'react';

const InputElement = React.forwardRef((props: any, ref: React.ForwardedRef<unknown>) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (props.onChange) props.onChange(event);
  };

  return <input {...props} onChange={handleChange} value={value} ref={ref}/>;
});

export default InputElement;
