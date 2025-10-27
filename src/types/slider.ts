/**
 * 轮播图数据项接口
 */
export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  backgroundPosition?: string;
}

/**
 * 轮播配置接口
 */
export interface SliderConfig {
  autoPlay: boolean;
  interval: number; // 自动播放间隔（毫秒）
  transitionDuration: number; // 过渡动画时长（毫秒）
  pauseOnHover: boolean; // 鼠标悬停时暂停
}

