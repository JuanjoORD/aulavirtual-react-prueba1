import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import classnames from 'classnames';

require('./LoadMask.css');

class LoadMask extends Component {
    static propTypes = {
      radius: PropTypes.bool,
      loading: PropTypes.bool.isRequired,
      dark: PropTypes.bool,
      blur: PropTypes.bool,
      light: PropTypes.bool,
    };

    static defaultProps = {
      radius: false,
      dark: false,
      blur: false,
      light: false,
    };

    render() {
      const {
        children, radius, dark, light, blur, loading, type="Triangle"
      } = this.props;

      return (
        <div className="load-mask">
          {loading && (
            <div
              className={classnames('loader-container', {
                radius,
                dark,
                light,
              })}
            >
              <Loader
                type={type}
                color="#3AC0FF"
                height="100"
                width="100"
              />
              {/*<p>Cargando...</p>*/}
            </div>
          )}
          <div
            className={classnames('load-mask-content', {
              loading,
              blur,
            })}
          >
            {children}
          </div>
        </div>
      );
    }
}

export default LoadMask;
