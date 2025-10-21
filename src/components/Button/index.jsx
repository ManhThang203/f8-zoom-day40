import clsx from "clsx";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

function Button({
  primary = false,
  outline = false,
  children,
  href,
  className,
  onClick,
  size = "medium",
  ...passProps
}) {
  const classNames = clsx(styles.btn, styles[size], className, {
    [styles.primary]: primary,
    [styles.outline]: outline,
  });
  const Component = href ? "a" : "button";
  return (
    <Component
      {...passProps}
      href={href}
      className={classNames}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
Button.prototype = {
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.string,
  passProps: PropTypes.string,
};
export default Button;
