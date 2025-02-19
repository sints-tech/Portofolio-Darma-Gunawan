function decode(component) {
    if (!component)
        return component;
    return decodeURIComponent(component);
}
const hostInfo = {
    version: "3e2d857",
    scopeCanvas: JSON.parse("true"),
};
const projectIdRegex = /^\/projects\/(?<prefix>(?:(?:[A-Za-z0-9]+-)*[A-Za-z0-9]+--)?)(?<id>[A-Za-z0-9]{20})(?<accessToken>(?:-[A-Za-z0-9]+)?)/;
const projectMatch = location.pathname.match(projectIdRegex);
const projectId = projectMatch ? .groups ? .id;
const projectAccessToken = projectMatch ? .groups ? .accessToken || undefined;
const shareUUIDRegex = /^\/share\/(?<shareId>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})(?:\/(?<frameId>[^/]+))?/;
const shareRegex = /^\/share\/(?<prefix>(?:(?:[A-Za-z0-9]+-)*[A-Za-z0-9]+--)?)(?<shareId>[A-Za-z0-9]+)(?:\/(?<frameId>[^/]+))?/;
const shareMatch = location.pathname.match(shareUUIDRegex) ? ? location.pathname.match(shareRegex);
const shareId = shareMatch ? .groups ? .shareId;
const frameId = decode(shareMatch ? .groups ? .frameId);
const embedRegex = /^\/embed\/(?<prefix>(?:(?:[A-Za-z0-9]+-)*[A-Za-z0-9]+--)?)(?<shareId>[A-Za-z0-9]+)(?:\/(?<frameId>[^/]+))?/;
const embedMatch = location.pathname.match(embedRegex);
const embedShareId = embedMatch ? .groups ? .shareId;
const embedFrameId = decode(embedMatch ? .groups ? .frameId);
let canvas = "https://framercanvas.com";
if (projectId && hostInfo.scopeCanvas) {
    canvas = canvas.replace("//", `//project-${projectId.toLowerCase()}.`);
}
const bootstrap = {
    services: {
        api: "https://api.framer.com",
        app: "https://framer.com",
        canvas,
        events: "https://events.framer.com",
        login: "https://login.framer.com",
        userContent: "https://framerusercontent.com",
        modulesCDN: "https://framerusercontent.com/modules",
        modulesShortLink: "https://framer.com/m",
        previewDomain: "framer.app",
    },
    hostInfo: {
        version: hostInfo.version,
    },
};
if (projectId) {
    bootstrap.project = {
        id: projectId,
        accessToken: projectAccessToken
    };
}
if (shareId) {
    bootstrap.share = {
        id: shareId,
        frameId
    };
}
if (embedShareId) {
    bootstrap.embed = {
        shareId: embedShareId,
        frameId: embedFrameId
    };
}
Object.freeze(bootstrap);
window.bootstrap = bootstrap;