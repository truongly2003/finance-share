import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const MoneyInput = ({
  value,
  onChange,
  label = "Số tiền",
  placeholder = "Nhập số tiền",
  name,
}) => {
  const handleValueChange = (values) => {
    const { value: rawValue } = values; // Giá trị thô (chuỗi không định dạng)
    const event = {
      target: {
        name,
        value: rawValue,
      },
    };
    onChange(event);
  };

  return (
    <div className="col-span-2">
      <label htmlFor={name} className="text-sm text-gray-600">
        {label}
      </label>
      <NumericFormat
        id={name}
        name={name}
        className="border rounded p-2 w-full text-gray-900 focus:outline-none focus:ring-2 "
        value={value || ""} // Đảm bảo không bị undefined
        onValueChange={handleValueChange}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        placeholder={placeholder}
        // Giới hạn giá trị từ 100 đến 1 nghìn tỷ, nhưng vẫn cho phép gõ từng ký tự
        isAllowed={(values) => {
          const { floatValue } = values;
          // Cho phép gõ khi chưa hoàn thiện (undefined) hoặc trong khoảng hợp lệ
          return floatValue === undefined || (floatValue >= 0 && floatValue <= 1000000000000);
        }}
      />
    </div>
  );
};

MoneyInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default MoneyInput;