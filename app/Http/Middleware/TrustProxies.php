<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * Cloudways (and most managed hosts) sit behind an internal reverse proxy
     * (Varnish + Apache/Nginx), so PHP sees every request as coming from
     * localhost unless we trust that proxy and read the real client IP from
     * X-Forwarded-For. '*' trusts whatever proxy is directly in front of PHP —
     * safe here since that's Cloudways' own internal infrastructure, not an
     * arbitrary public network hop.
     *
     * @var array<int, string>|string|null
     */
    protected $proxies = '*';

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}