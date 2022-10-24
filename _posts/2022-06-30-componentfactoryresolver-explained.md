---
layout: post
title: How ComponentFactoryResolver can unlock powerful higher-order components
image: factory.png
caption: Via ArtsyBee on Pixabay
---

If you work with any component-based framework long enough, you'll run into a problem. How do you share functionality across components?

Angular gives us many options. You can share logic in services, child components or directives. However, sometimes these options are not enough. A directive can only modify an element, a service cannot display content, and a child component should not modify its parent.

Sometimes, the best option is to build a [higher-order component](https://reactjs.org/docs/higher-order-components.html). A higher-order component accepts another component as its input and "wraps" it. This is a common pattern in React and a great way to share logic across components without burdening them with extra service dependencies or logic.

With a little help from `ComponentFactoryResolver`, we can do this in Angular too.

**[Read the rest at the Bitovi blog](https://www.bitovi.com/blog/how-componentfactoryresolver-can-unlock-powerful-higher-order-components)**.