---
layout: page
title: '标签'
is-show-edit: false
is-show-sidebar: false
---

<div class="site-tags">

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tag_words = site_tags | split:',' | sort %}

<!-- 导航 -->
<ul class="nav">
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
    <li>
        <a href="#{{ this_word | replace:' ','-' }}" title="{{ this_word }}">
          {{ this_word }}
        </a>
        <span>{{ site.tags[this_word].size }}</span>
    </li>
  {% endunless %}{% endfor %}
</ul>

<!-- 列表 -->

{% for item in (0..site.tags.size) %}{% unless forloop.last %}
{% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}

  <div class="site-page-list">
      <legend id="{{ this_word | replace:' ','-' }}">
          <b>{{ this_word }}</b>
      </legend>
      <ul class="list">
          {% for post in site.tags[this_word] %}{% if post.title != null %}
          <li>
              <span>{{ post.date | date: "%F" }}</span>
            <b class='raqu'> &raquo; </b>
            <a href="{{ post.url | relative_url }}"
                title="{{ post.title }}"
                >
                {{ post.title }}
            </a>
          </li>
          {% endif %}{% endfor %}
      </ul>
  </div>
{% endunless %}{% endfor %}
</div>
