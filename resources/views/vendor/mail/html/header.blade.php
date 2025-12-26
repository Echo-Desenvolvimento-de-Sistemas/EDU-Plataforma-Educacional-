@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (isset($logoUrl) && $logoUrl)
                <img src="{{ asset($logoUrl) }}" class="logo" alt="{{ $schoolName ?? 'Logo' }}"
                    style="max-height: 100px; width: auto;">
            @else
                @if (trim($slot) === 'Laravel')
                    {{ $schoolName ?? config('app.name') }}
                @else
                    {{ $slot }}
                @endif
            @endif
        </a>
    </td>
</tr>