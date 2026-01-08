const distroText = {
    ubuntu: `<h3>Ubuntu</h3>
    <p>Ubuntu is the gateway to Linux for millions, boasting a massive software repository (over 60,000 packages) and Long Term Support (LTS) releases every two years for rock-solid stability. Pre-installed snaps and a polished GNOME desktop make it effortless for daily tasks, development, or servers. Perfect if you're switching from Windows/macOS.</p>
    <ul>
        <li><strong>Best for:</strong> Beginners, servers, cloud</li>
        <li><strong>Package manager:</strong> APT</li>
        <li><strong>Release cycle:</strong> 6 months (LTS every 2 years)</li>
        <li><strong>Pros:</strong> Easy to use and lots of quides; stable, making it able to stay on for months or even years</li>
        <li><strong>Cons:</strong> Owned by a corporation; on the more bloated side of Linux distros</li>
    </ul>`,

    fedora: `<h3>Fedora</h3>
    <p>Fedora Workstation brings Red Hat's enterprise innovation to your desktop with the latest GNOME, kernels, and Wayland support straight from upstream—ideal for developers testing future tech. It's spin-heavy (KDE, XFCE options) and spins packages into Flatpaks for sandboxed apps.</p>
    <ul>
        <li><strong>Best for:</strong> Developers, cutting-edge features</li>
        <li><strong>Package manager:</strong> DNF</li>
        <li><strong>Release cycle:</strong> Every 6 months</li>
        <li><strong>Pros:</strong> Easy and powerful install</li>
        <li><strong>Cons:</strong> Hard to parse website; by default when asked for yes or no (y/n) in installs the no is selected</li>
    </ul>`,

    arch: `<h3>Arch Linux</h3>
    <p>Arch is the minimalist's dream: a rolling-release base where you build your system via pacman and the Arch User Repository (AUR), guided by the legendary wiki. It's lightweight, always current, and fosters deep learning—KDE, GNOME, or i3, your call.</p>
    <ul>
        <li><strong>Best for:</strong> Tinkerers, power users</li>
        <li><strong>Package manager:</strong> Pacman + AUR</li>
        <li><strong>Release cycle:</strong> Rolling</li>
        <li><strong>Pros:</strong> Powerfull and not too hard install with the archinstall script; you're in control of everything; one of the best wiki's; rolling release</li>
        <li><strong>Cons:</strong> Your're in control of everything, so it has a deep learning curve; bleeding-edge rolling release makes it, that some software might brake from time-to-time on a new update</li>
    </ul>`,

    debian: `<h3>Debian</h3>
    <p>Debian's mantra is "free software, done right". Ultra-stable with testing/unstable branches, powering countless derivatives like Ubuntu. It's server gold with minimalism and vast repos, though desktops need some polish post-install.</p>
    <ul>
        <li><strong>Best for:</strong> Servers, stability seekers</li>
        <li><strong>Package manager:</strong> APT</li>
        <li><strong>Release cycle:</strong> Every 2-3 years</li>
        <li><strong>Pros:</strong> Stable, able to stay powerd on for months or even years</li>
        <li><strong>Cons:</strong> One of the worst installs I have tried; long time between releases</li>
    </ul>`,

    popos: `<h3>Pop!_OS</h3>
    <p>System76's Pop!_OS supercharges Ubuntu for creators and gamers with NVIDIA ISO options, tiled window management via Pop Shell, and auto hardware detection. Rust-based COSMIC desktop incoming for even snappier performance.</p>
    <ul>
        <li><strong>Best for:</strong> Gaming, NVIDIA users, productivity, beginners</li>
        <li><strong>Package manager:</strong> APT + Pop Shop</li>
        <li><strong>Release cycle:</strong> Matches Ubuntu LTS</li>
        <li><strong>Pros:</strong> A lot of guides available, because it's based on Ubuntu, without the same corporation overlord</li>
        <li><strong>Cons:</strong> Long release cycles, so you have to rely on flatpaks</li>
    </ul>`,

    mint: `<h3>Linux Mint</h3>
    <p>Linux Mint mimics Windows familiarity with Cinnamon desktop, Timeshift backups, and out-of-box multimedia. Ubuntu-based but bloat-free. It's the "it just works" choice for office work, media, and casual use.</p>
    <ul>
        <li><strong>Best for:</strong> Windows switchers, everyday desktops, offices</li>
        <li><strong>Package manager:</strong> APT</li>
        <li><strong>Release cycle:</strong> Every 6 months</li>
        <li><strong>Pros:</strong> familiar DE if you have used Windows 7(or older) and/or 10; Ubuntu based, so a lot of guides available</li>
        <li><strong>Cons:</strong> It's Cinnamon desktop feels a little out-dated with it's looks; a little bloated compared to something like Arch Linux or Fedora</li>
    </ul>`,

    opensuse: `<h3>openSUSE</h3>
    <p>openSUSE balances Leap's Debian-like stability with Tumbleweed's rolling atomic updates, powered by YaST's wizard for configs and BTRFS snapshots for easy rollbacks. KDE shines here for plasma fans.</p>
    <ul>
        <li><strong>Best for:</strong> Sysadmins, KDE lovers</li>
        <li><strong>Package manager:</strong> Zypper</li>
        <li><strong>Release cycle:</strong> Leap (2-3 yrs), Tumbleweed (rolling)</li>
        <li><strong>Pros:</strong> It has stable release for the ones wanting stability, and rolling release, who want the latest updates for software</li>
        <li><strong>Cons:</strong> It doesn't have as many tutorials and guides specific to this distro compared to Arch Linux and Ubuntu</li>
    </ul>`,

    manjaro: `<h3>Manjaro</h3>
    <p>Manjaro tames Arch with hardware detection, stable branch delays, and MHWD for drivers. KDE, XFCE, or GNOME editions ready to roll. Pamac GUI simplifies AUR access for noobs-to-pros.</p>
    <ul>
        <li><strong>Best for:</strong> Arch without hassle, gamers</li>
        <li><strong>Package manager:</strong> Pacman + Pamac</li>
        <li><strong>Release cycle:</strong> Rolling (delayed)</li>
        <li><strong>Pros:</strong> It has pacman the package manager of Arch Linux and also has the AUR preconfigured with the Pamac GUI</li>
        <li><strong>Cons:</strong> It's install isn't as powerful as the Arch Linux installation</li>
    </ul>`,

    endeavouros: `<h3>EndeavourOS</h3>
    <p>EndeavourOS is Arch "the easy way" with Calamares installer, online repos during setup, and welcome app for tweaks. Pure Arch experience minus manual partitioning pain.</p>
    <ul>
        <li><strong>Best for:</strong> Easy Arch entry</li>
        <li><strong>Package manager:</strong> Pacman + AUR</li>
        <li><strong>Release cycle:</strong> Rolling</li>
        <li><strong>Pros:</strong> Easy to use GUI network install; it uses pacman, and also has the option of using the AUR</li>
        <li><strong>Cons:</strong> Even tough it's installtion is very easy, it is not immutable so some beginners might brake some aspects of the system</li>
    </ul>`,

    garuda: `<h3>Garuda Linux</h3>
    <p>Garuda Linux amps Arch for speed with Zen kernels, BTRFS snapshots, and gaming optimizations. Dragonized KDE edition dazzles with effects and tools like Garuda Gamer.</p>
    <ul>
        <li><strong>Best for:</strong> Gaming, visual flair</li>
        <li><strong>Package manager:</strong> Pacman + Chaotic-AUR</li>
        <li><strong>Release cycle:</strong> Rolling</li>
        <li><strong>Pros:</strong> One of the fastest and most optimized kernels for gaming, is installed out of the box; snapshots make it easier to recover the system if something breaks</li>
        <li><strong>Cons:</strong> Might be a bit too much flair for some; also the snapshot might eat up some valuable storage space</li>
    </ul>`,

    gentoo: `<h3>Gentoo</h3>
    <p>Gentoo compiles from source with USE flags for hyper-optimized binaries matched to your CPU. Portage shines, but expect hours-long emerges for true minimalism.</p>
    <ul>
        <li><strong>Best for:</strong> Optimization geeks</li>
        <li><strong>Package manager:</strong> Portage</li>
        <li><strong>Release cycle:</strong> Rolling</li>
        <li><strong>Pros:</strong> It has outstanding hardware compatibility, better than any other OS; you control everything that is installed</li>
        <li><strong>Cons:</strong> It has one of the steepest learning curve of any Linux distro; you have to compile everything</li>
    </ul>`,

    bazzite: `<h3>Bazzite</h3>
    <p>Bazzite turns Fedora Atomic into SteamOS 3 vibes for handhelds/desktops, with HDR, VRR, and controller firmware. Immutable for reliability in gaming marathons and ease of use for begginers.</p>
    <ul>
        <li><strong>Best for:</strong> Handheld gaming, HTPCs</li>
        <li><strong>Package manager:</strong> rpm-ostree + Distrobox</li>
        <li><strong>Release cycle:</strong> Rolling atomic</li>
        <li><strong>Pros:</strong> Easy and powerful install, matching the base Fedora one; immutable system, so beginners can't accidentally break it; console-like experience very similar to the SteamOS</li>
        <li><strong>Cons:</strong> The installtion media is somewhat hardware specific; the Steam Gaming Mode is not available for all hardware</li>
    </ul>`,

    steamos: `<h3>SteamOS</h3>
    <p>Valve's SteamOS (Arch-based) fuels Steam Deck with Proton for Windows games, Gamescope compositor, and Deck UI. In some cases you can install on PCs for console-like Linux gaming.</p>
    <ul>
        <li><strong>Best for:</strong> Gaming handhelds, couches</li>
        <li><strong>Package manager:</strong> Pacman (internal)</li>
        <li><strong>Release cycle:</strong> Rolling</li>
        <li><strong>Pros:</strong> It is an Arch based immutable distro so the average consumer can't break it; it's the lowest system overhead console OS that's installed by any manufacturer; even tough it was made for handheld consoles in the first place, it has a full desktop experience powered by KDE</li>
        <li><strong>Cons:</strong> It's desktop computer hardware support is not great yet, but it most likely will get better in the future</li>
    </ul>`,

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