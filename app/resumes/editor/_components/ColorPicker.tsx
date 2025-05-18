import { Color, ColorChangeHandler } from "react-color";

interface IColorPicker {
  color?: Color;
  onChange: ColorChangeHandler;
}

const ColorPicker = ({ color, onChange }: IColorPicker) => {
  console.log(color, onChange);

  return <h2>ColorPicker</h2>;
};

export default ColorPicker;
