export type ComponentType = "text" | "button" | "image" | "div" | "page";

export interface Padding {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface Margin {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface axisPadding {
  x?: number;
  y?: number;
}

export interface axisMargin {
  x?: number;
  y?: number;
}

export interface float {
  float: string;
}

export interface visible {
  visible: string;
}

export interface flex {
  flexBasis?: string;
  flexDirection?: string;
  flexWrap?: string;
  flexGrow?: string;
  flexShrink?: string;
  order?: string;
  justifyContent?: string;
  justifySelf?: string;
  justifyItems?: string;
  alignItems?: string;
  alignContent?: string;
  alignSelf?: string;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
  gap?: string;
}

export interface grid {
  gridTemplateColumns?: string;
  gridColumn?: string;
  gridTemplateRows?: string;
  gridRow?: string;
  gridAutoFlow?: string;
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gap?: string;
}

export interface sizing {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
}

export interface typography {
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  textTransform?: string;
  textOverflow?: string;
  textIndent?: string;
  lineHeight?: string;
  letterSpacing?: string;
  wordSpacing?: string;
  whiteSpace?: string;
}

export interface background {
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundAttachment?: string;
}

export interface border {
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderWidth?: string;
}

export interface effects {
  boxShadow?: string;
  boxShadowColor?: string;
  opacity?: string;
  mixBlendMode?: string;
  backgroundBlendMode?: string;
}

export interface position {
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
}

export interface filters {
  blur?: string;
  brightness?: string;
  contrast?: string;
  dropShadow?: string;
  grayscale?: string;
  hueRotate?: string;
  invert?: string;
  saturate?: string;
  sepia?: string;
  backdropBlur?: string;
  backdropBrightness?: string;
  backdropContrast?: string;
  backdropGrayscale?: string;
  backdropHueRotate?: string;
  backdropInvert?: string;
  backdropOpacity?: string;
  backdropSaturate?: string;
  backdropSepia?: string;
}

export interface table {
  tableLayout?: string;
  borderCollapse?: string;
  borderSpacing?: string;
  captionSide?: string;
  emptyCells?: string;
}

export interface animation {
  transition?: string;
  duration?: string;
  transionTimingFunction?: string;
  transitionDelay?: string;
  animationName?: string;
}

export interface transform {
  transform?: string;
  transformOrigin?: string;
  transformStyle?: string;
  perspective?: string;
  perspectiveOrigin?: string;
  backfaceVisibility?: string;
}

export interface intractive {
  accentColor?: string;
  appearance?: string;
  cursor?: string;
  caretColor?: string;
  resize?: string;
  scrollBehavior?: string;
  scrollMargin?: string;
  scrollPadding?: string;
  scrollSnapType?: string;
  scrollSnapAlign?: string;
  scrollSnapStop?: string;
  touchAction?: string;
  userSelect?: string;
  willChange?: string;
}

export interface ComponentStyles {
  padding?: Padding;
  margin?: Margin;
  axisPadding?: axisPadding;
  axisMargin?: axisMargin;
  float?: float;
  visible?: visible;
  flex?: flex;
  grid?: grid;
  sizing?: sizing;
  typography?: typography;
  background?: background;
  border?: border;
  effects?: effects;
  position?: position;
  filters?: filters;
  table?: table;
  animation?: animation;
  transform?: transform;
  intractive?: intractive;
}

export interface BuilderComponent {
  id: string;
  name: string;
  type: ComponentType;
  canHaveChildren: boolean;
  children?: BuilderComponent[];
  onClick?: string;
  props?: {
    text?: string;
    src?: string;
    alt?: string;
    href?: string;
  };
  tailwindClasses?: string;
  styles?: {
    mobile?: ComponentStyles;
    tablet?: ComponentStyles;
    desktop?: ComponentStyles;
  };
}

export interface PageConfig {
  id: string;
  name: string;
  children: BuilderComponent[];
}
