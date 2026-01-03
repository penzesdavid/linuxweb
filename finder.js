document.querySelector('#hyde').style.visibility = 'hidden';

const distroText = {
    ubuntu: `<h3>Ubuntu</h3>
    <p>Ubuntu is the gateway to Linux for millions, boasting a massive software repository (over 60,000 packages) and Long Term Support (LTS) releases every two years for rock-solid stability. Pre-installed snaps and a polished GNOME desktop make it effortless for daily tasks, development, or servers—perfect if you're switching from Windows/macOS.</p>
    <ul>
        <li><strong>Best for:</strong> Beginners, servers, cloud</li>
        <li><strong>Package manager:</strong> APT</li>
        <li><strong>Release cycle:</strong> 6 months (LTS every 2 years)</li>
    </ul>`,

    fedora: `<h3>Fedora</h3>
    <p>Fedora Workstation brings Red Hat's enterprise innovation to your desktop with the latest GNOME, kernels, and Wayland support straight from upstream—ideal for developers testing future tech. It's spin-heavy (KDE, XFCE options) and spins packages into Flatpaks for sandboxed apps.</p>
    <ul>
        <li><strong>Best for:</strong> Developers, cutting-edge features</li>
        <li><strong>Package manager:</strong> DNF</li>
        <li><strong>Release cycle:</strong> Every 6 months</li>
    </ul>`,

    arch: `<h3>Arch Linux</h3>
    <p>Arch is the minimalist's dream: a rolling-release base where you build your system via pacman and the Arch User Repository (AUR), guided by the legendary wiki. It's lightweight, always current, and fosters deep learning—KDE, GNOME, or i3, your call.</p>
    <ul>
        <li><strong>Best for:</strong> Tinkerers, power users</li>
        <li><strong>Package manager:</strong> Pacman + AUR</li>
        <li><strong>Release cycle:</strong> Rolling</li>
    </ul>`,

    debian: `<h3>Debian</h3>
    <p>Debian's mantra is "free software, done right"—ultra-stable with testing/unstable branches, powering countless derivatives like Ubuntu. It's server gold with minimalism and vast repos, though desktops need some polish post-install.</p>
    <ul>
        <li><strong>Best for:</strong> Servers, stability seekers</li>
        <li><strong>Package manager:</strong> APT</li>
        <li><strong>Release cycle:</strong> Every 2-3 years</li>
    </ul>`,

    popos: `<h3>Pop!_OS</h3>
    <p>System76's Pop!_OS supercharges Ubuntu for creators and gamers with NVIDIA ISO options, tiled window management via Pop Shell, and auto hardware detection. Rust-based COSMIC desktop incoming for even snappier performance.</p>
    <ul>
        <li><strong>Best for:</strong> Gaming, NVIDIA users, productivity</li>
        <li><strong>Package manager:</strong> APT + Pop Shop</li>
        <li><strong>Release cycle:</strong> Matches Ubuntu LTS</li>
    </ul>`,

    mint: `<h3>Linux Mint</h3>
    <p>Linux Mint mimics Windows familiarity with Cinnamon desktop, Timeshift backups, and out-of-box multimedia—Ubuntu-based but bloat-free. It's the "it just works" choice for office work, media, and casual use.</p>
    <ul>
        <li><strong>Best for:</strong> Windows switchers, everyday desktops</li>
        <li><strong>Package manager:</strong> APT + Software Manager</li>
        <li><strong>Release cycle:</strong> Every 6 months</li>
    </ul>`,

    opensuse: `<h3>openSUSE</h3>
    <p>openSUSE balances Leap's Debian-like stability with Tumbleweed's rolling atomic updates, powered by YaST's wizard for configs and Btrfs snapshots for easy rollbacks. KDE shines here for plasma fans.</p>
    <ul>
        <li><strong>Best for:</strong> Sysadmins, KDE lovers</li>
        <li><strong>Package manager:</strong> Zypper</li>
        <li><strong>Release cycle:</strong> Leap (2-3 yrs), Tumbleweed (rolling)</li>
    </ul>`,

    manjaro: `<h3>Manjaro</h3>
    <p>Manjaro tames Arch with hardware detection, stable branch delays, and MHWD for drivers—KDE, XFCE, or GNOME editions ready to roll. Pamac GUI simplifies AUR access for noobs-to-pros.</p>
    <ul>
        <li><strong>Best for:</strong> Arch without hassle, gamers</li>
        <li><strong>Package manager:</strong> Pacman + Pamac</li>
        <li><strong>Release cycle:</strong> Rolling (delayed)</li>
    </ul>`,

    endeavouros: `<h3>EndeavourOS</h3>
    <p>EndeavourOS is Arch "the easy way" with Calamares installer, online repos during setup, and welcome app for tweaks—pure Arch experience minus manual partitioning pain.</p>
    <ul>
        <li><strong>Best for:</strong> Easy Arch entry</li>
        <li><strong>Package manager:</strong> Pacman + AUR</li>
        <li><strong>Release cycle:</strong> Rolling</li>
    </ul>`,

    garuda: `<h3>Garuda Linux</h3>
    <p>Garuda Linux amps Arch for speed with Zen kernels, BTRFS snapshots, and gaming optimizations—Dragonized KDE edition dazzles with effects and tools like Garuda Gamer.</p>
    <ul>
        <li><strong>Best for:</strong> Gaming, visual flair</li>
        <li><strong>Package manager:</strong> Pacman + Chaotic-AUR</li>
        <li><strong>Release cycle:</strong> Rolling</li>
    </ul>`,

    gentoo: `<h3>Gentoo</h3>
    <p>Gentoo compiles from source with USE flags for hyper-optimized binaries matched to your CPU—Portage shines, but expect hours-long emerges for true minimalism.</p>
    <ul>
        <li><strong>Best for:</strong> Optimization geeks</li>
        <li><strong>Package manager:</strong> Portage</li>
        <li><strong>Release cycle:</strong> Rolling</li>
    </ul>`,

    bazzite: `<h3>Bazzite</h3>
    <p>Bazzite turns Fedora Atomic into SteamOS 3 vibes for handhelds/desktops, with HDR, VRR, and controller firmware—immutable for reliability in gaming marathons.</p>
    <ul>
        <li><strong>Best for:</strong> Handheld gaming, HTPCs</li>
        <li><strong>Package manager:</strong> rpm-ostree + Distrobox</li>
        <li><strong>Release cycle:</strong> Rolling atomic</li>
    </ul>`,

    steamos: `<h3>SteamOS</h3>
    <p>Valve's SteamOS (Arch-based) fuels Steam Deck with Proton for Windows games, Gamescope compositor, and Deck UI—install on PCs for console-like Linux gaming.</p>
    <ul>
        <li><strong>Best for:</strong> Gaming handhelds, couches</li>
        <li><strong>Package manager:</strong> Pacman (internal)</li>
        <li><strong>Release cycle:</strong> Rolling</li>
    </ul>`,

    chromeos: `<h3>ChromeOS (ChromiumOS / ChromeOS Flex)</h3>
    <p>ChromeOS delivers Google's cloud-first ecosystem with instant auto-updates, Android app integration via ARCVM, and Linux Crostini for dev tools—all in a secure, verified boot environment. ChromeOS Flex revives old PCs as managed kiosks or browsers, emphasizing web apps over traditional desktops.</p>
    <ul>
        <li><strong>Best for:</strong> Web browsing, education, enterprise</li>
        <li><strong>Package manager:</strong> Portage (internal) + deb for Linux apps</li>
        <li><strong>Release cycle:</strong> Continuous auto-updates</li>
    </ul>`
};

function popOut() {
    const pickedDistro = document.querySelector('#distro-select').value;

    // console.log(distroText[pickedDistro])
    document.querySelector('#hyde').innerHTML = distroText[pickedDistro];
    document.querySelector('#hyde').style.visibility = 'visible';

}