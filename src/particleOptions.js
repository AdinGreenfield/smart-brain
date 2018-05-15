export const PARTICLE_OPTIONS = {
  particles: {
    number: {
      value: '80',
      density: {
        enable: 'true',
        value_area: '800'
      }
    },
    opacity: {
      value: '1'
    },
    color: {
      value: '#ffffff'
    },
    line_linked: {
      enable: 'true',
      color: '#ffffff',
      opacity: '1'
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: 'true',
        mode: 'repulse'
      }
    }
  },
  mode: {
    repulse: {
      distance: '1000',
      duration: '.4'
    }
  }
}