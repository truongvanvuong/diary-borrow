import PropTypes from "prop-types";

const Button = ({
  primary = false,
  disabled = false,
  small = false,
  medium = false,
  large = false,
  roundedBorder = false,
  outline = false,
  className,
  rightIcon,
  lefIcon,
  children,
  onClick,
  ...passProps
}) => {
  const props = {
    onClick,
    ...passProps,
  };
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  const classes = {
    primary,
    outline,
    disabled,
    roundedBorder,
    small,
    medium,
    large,
    [className]: className,
  };
  return (
    <button
      className={Object.keys(classes)
        .filter((key) => classes[key])
        .join(" ")}
      {...props}
    >
      {lefIcon && <span className="text-base">{lefIcon}</span>}
      <span className="text-base">{children}</span>
      {rightIcon && <span className="text-base">{rightIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  roundedBorder: PropTypes.bool,
  className: PropTypes.string,
  rightIcon: PropTypes.node,
  lefIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
