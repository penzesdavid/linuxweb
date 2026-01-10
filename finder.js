const distroText = {
    ubuntu: `<h3>Ubuntu</h3>
    <p>Ubuntu is the gateway to Linux for millions, boasting a massive software repository (over 60,000 packages) and Long Term Support (LTS) releases every two years for rock-solid stability. Pre-installed snaps and a polished GNOME desktop make it effortless for daily tasks, development, or servers. Perfect if you're switching from Windows/macOS.</p>`,

    mint: `<h3>Linux Mint</h3>
    <p>Linux Mint mimics Windows familiarity with Cinnamon desktop, Timeshift backups, and out-of-box multimedia. Ubuntu-based but bloat-free. It's the "it just works" choice for office work, media, and casual use.</p>`,

    popos: `<h3>Pop!_OS</h3>
    <p>System76's Pop!_OS supercharges Ubuntu for creators and gamers with NVIDIA ISO options, tiled window management via Pop Shell, and auto hardware detection. Rust-based COSMIC desktop incoming for even snappier performance.</p>`,

    debian: `<h3>Debian</h3>
    <p>Debian's mantra is "free software, done right". Ultra-stable with testing/unstable branches, powering countless derivatives like Ubuntu. It's server gold with minimalism and vast repos, though desktops need some polish post-install.</p>`,

    fedora: `<h3>Fedora</h3>
    <p>Fedora Workstation brings Red Hat's enterprise innovation to your desktop with the latest GNOME, kernels, and Wayland support straight from upstream—ideal for developers testing future tech. It's spin-heavy (KDE, XFCE options) and spins packages into Flatpaks for sandboxed apps.</p>`,

    bazzite: `<h3>Bazzite</h3>
    <p>Bazzite turns Fedora Atomic into SteamOS 3 vibes for handhelds/desktops, with HDR, VRR, and controller firmware. Immutable for reliability in gaming marathons and ease of use for begginers.</p>`,

    arch_btw: `<h3>Arch Linux</h3>
    <p>Arch is the minimalist's dream: a rolling-release base where you build your system via pacman and the Arch User Repository (AUR), guided by the legendary wiki. It's lightweight, always current, and fosters deep learning—KDE, GNOME, or i3, your call.</p>`,

    endeavouros: `<h3>EndeavourOS</h3>
    <p>EndeavourOS is Arch "the easy way" with Calamares installer, online repos during setup, and welcome app for tweaks. Pure Arch experience minus manual partitioning pain.</p>`,

    manjaro: `<h3>Manjaro</h3>
    <p>Manjaro tames Arch with hardware detection, stable branch delays, and MHWD for drivers. KDE, XFCE, or GNOME editions ready to roll. Pamac GUI simplifies AUR access for noobs-to-pros.</p>`,

    garuda: `<h3>Garuda Linux</h3>
    <p>Garuda Linux amps Arch for speed with Zen kernels, BTRFS snapshots, and gaming optimizations. Dragonized KDE edition dazzles with effects and tools like Garuda Gamer.</p>`,

    opensuse: `<h3>openSUSE</h3>
    <p>openSUSE balances Leap's Debian-like stability with Tumbleweed's rolling atomic updates. Powered by YaST's wizard for configs and BTRFS snapshots for easy rollbacks. KDE shines here for plasma fans.</p>`,

    gentoo: `<h3>Gentoo</h3>
    <p>Gentoo compiles from source with USE flags for hyper-optimized binaries matched to your CPU. Portage shines, but expect hours-long emerges for true minimalism.</p>`,

    steamos: `<h3>SteamOS</h3>
    <p>Valve's SteamOS (Arch-based) fuels Steam Deck with Proton for Windows games, Gamescope compositor, and Deck UI. In some cases you can install on PCs for console-like Linux gaming.</p>`,

    chromeos: `<h3>ChromeOS (ChromiumOS / ChromeOS Flex)</h3>
    <p>ChromeOS delivers Google's cloud-first ecosystem with instant auto-updates, Android app integration via ARCVM, and Linux Crostini for dev tools—all in a secure, verified boot environment. ChromeOS Flex revives old PCs as managed kiosks or browsers, emphasizing web apps over traditional desktops.</p>
    <ul>
        <li><strong>Best for:</strong> Web browsing, education, enterprise</li>
        <li><strong>Package manager:</strong> Portage (internal) + deb for Linux apps</li>
        <li><strong>Release cycle:</strong> Continuous auto-updates</li>
        <li><strong>Pros:</strong></li>
        <li><strong>Cons:</strong></li>
    </ul>`
};

document.querySelector('#hyde').style.visibility = 'hidden';

function popOut() {
    const pickedDistro = document.querySelector('#distro-select').value;

    // console.log(distroText[pickedDistro])
    if (pickedDistro != '') {
        document.querySelector('#hyde').innerHTML = distroText[pickedDistro];
        document.querySelector('#hyde').style.visibility = 'visible';
    } else {

    }
}