module.exports = {
  title: 'Linux Sever',
  description: 'Corso di CentOS, virtualizzazione e networking',
  themeConfig: {
    logo: '/assets/img/logo.png',
    repo: 'handgull/Linux-bash-cookbook/',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Linux Server', link: '/linux-server/' }
    ],
    sidebar: {
      '/linux-server/': getBashSidebar('Linux Server')
    },
    smoothScroll: true
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    ['@vuepress/pwa', {
      serviceWorker: true,
      popupComponent: 'MySWUpdatePopup',
      updatePopup: true
    }],
    ['vuepress-plugin-code-copy', true]
  ]
}

function getBashSidebar (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        '',
        './virtualization/',
        './hyperv-first-steps/',
        './install-centos/',
        './networking/',
        './hyperv-checkpoint/',
        './nfs-service/',
        './dhcp-dns-connessioni-client-server/',
        './snap-e-risorse-dinamiche/',
        './nfs-utilization/',
        './linux-history/'
      ]
    }
  ]
}
