// Declaraciones de módulos para resolver errores de tipos
declare module 'react' {
  const React: any
  export default React
  export const useState: any
  export const useEffect: any
  export const useRef: any
  export const useCallback: any
  export const useMemo: any
  export const Fragment: any
}

declare module 'react/jsx-runtime' {
  export const Fragment: any
  export const jsx: any
  export const jsxs: any
}

declare module 'react-dom' {
  const ReactDOM: any
  export default ReactDOM
}

declare module 'lucide-react' {
  export const AlertCircle: any
  export const BookOpen: any
  export const Building2: any
  export const Building: any
  export const Calendar: any
  export const ChevronRight: any
  export const GraduationCap: any
  export const Mail: any
  export const MapPin: any
  export const Phone: any
  export const Search: any
  export const X: any
  export const Menu: any
  export const Users: any
  export const Globe: any
  export const Scale: any
  export const Gavel: any
  export const Briefcase: any
  export const UserCheck: any
  export const FileText: any
  export const CheckCircle: any
  export const Star: any
  export const Heart: any
  export const ExternalLink: any
  export const ChevronDown: any
  export const ChevronUp: any
  export const Plus: any
  export const Minus: any
  export const Filter: any
  export const Grid: any
  export const List: any
  export const Eye: any
  export const EyeOff: any
  export const Edit: any
  export const Trash: any
  export const Download: any
  export const Upload: any
  export const Settings: any
  export const LogOut: any
  export const User: any
  export const Lock: any
  export const Unlock: any
  export const Shield: any
  export const Key: any
  export const Clock: any
  export const CalendarDays: any
  export const ArrowRight: any
  export const ArrowLeft: any
  export const ArrowUp: any
  export const ArrowDown: any
  export const MoreHorizontal: any
  export const MoreVertical: any
  export const Copy: any
  export const Share: any
  export const Link: any
  export const MessageSquare: any
  export const Send: any
  export const Paperclip: any
  export const Image: any
  export const Video: any
  export const Music: any
  export const File: any
  export const Folder: any
  export const FolderOpen: any
  export const Home: any
  export const BarChart: any
  export const PieChart: any
  export const TrendingUp: any
  export const TrendingDown: any
  export const DollarSign: any
  export const CreditCard: any
  export const Banknote: any
  export const ShoppingCart: any
  export const Package: any
  export const Truck: any
  export const Zap: any
  export const Battery: any
  export const Wifi: any
  export const Bluetooth: any
  export const Volume2: any
  export const VolumeX: any
  export const Play: any
  export const Pause: any
  export const Square: any
  export const Circle: any
  export const Triangle: any
  export const Hexagon: any
  export const Diamond: any
  export const Baby: any
  export const Landmark: any
  export const Lightbulb: any
}

declare module '@radix-ui/react-*' {
  const component: any
  export default component
}

declare module 'class-variance-authority' {
  const cva: any
  export default cva
}

declare module 'clsx' {
  const clsx: any
  export default clsx
}

declare module 'tailwind-merge' {
  const twMerge: any
  export default twMerge
}

// Evitar errores de JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {}
