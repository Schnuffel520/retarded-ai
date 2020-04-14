import { loadWebGLConfig } from './cuon-func';

export default class WebGL {
  constructor(dom, config) {
    // this.componentWillMount = this.componentWillMount.bind(this);
    // this.render = this.render.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    // this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    // this.componentWillUpdata = this.componentWillUpdata.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
    // this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.WEBGL_CONTEXT_CONFIG = loadWebGLConfig(config);
    // this.componentWillMount();
    // console.log('hahah');
  }

  componentWillMount = () => {}

  // render = () => { }

  // componentDidMount = () => { }

  // componentWillReceiveProps = () => { }

  // shouldComponentUpdate = () => { }

  // componentWillUpdata = () => { }

  // componentDidUpdate = () => { }

  // componentWillUnmount = () => { }
}
