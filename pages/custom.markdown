---
layout: page
title: "自定义列表内容"
is-show-edit: false
---

> 这里获取的是_data文件夹里的custom.json文件，需要在custom.json配置

<!-- 注意：：：下面这一句是数据源 -->
{% assign data = site.data.pages.custom %}

<!-- 不想要标签可以注释掉以下代码片段 -->
<div class="site-tags">
    <ul class="nav">
        {% for item in data %}
            <li>
                <a href="#{{ item.title | replace:' ','-' }}" title="{{ item.title }}">
                {{ item.title }}
                </a>
                {% assign size = 0 %}
                {% if item.type == 1%}
                    {% for itemList in item.list %}
                        {% for items in itemList.list %}
                            {% assign size = size | plus: 1 %}
                        {% endfor %}
                    {% endfor %}
                {% endif%}
                 {% if item.type == 2%}
                    {% for itemList in item.list %}
                        {% for items in itemList.list %}
                            {% assign size = size | plus: 1 %}
                        {% endfor %}
                    {% endfor %}
                {% endif%}
                {% if item.type == 3 %}
                    {% for itemList in item.list %}
                        {% assign size = size | plus: 1 %}
                    {% endfor %}
                {% endif%}
                <span>{{ size }}</span>
            </li>
        {% endfor %}
    </ul>
</div>

<div>
    {% for group in data %}
        <!-- start type = 1 -->
        {% if group.type == 1 %}
        <div class="site-page-list">
            <legend id="{{ group.title | replace:' ','-' }}">
                <b>{{ group.title }}</b>
            </legend>
            {% assign type1Index = 0 %}
            {% for itemList in group.list %}
                <ul class="list">
                    {% for item in itemList.list %}
                    <li>
                        {% assign type1Index = type1Index | plus: 1 %}
                            <small>
                                {{ type1Index }}. 
                            </small>
                            <a class="post-link"
                                href="{{ site.baseurl }}{{ itemList.basePath }}{{ item.path }}"
                                title="{{ item.title | escape }}"
                                >
                                {{ item.title | escape }}
                            </a>
                        </li>
                    {% endfor %}
                </ul>
            {% endfor %}
        </div>
        {% endif%}
        <!-- end type = 1 -->
        <!-- start type = 2 -->
        {% if group.type == 2 %}
        <div class="site-page-list">
            <legend id="{{ group.title | replace:' ','-' }}">
                <b>{{ group.title }}</b>
            </legend>
            {% assign type2Index = 0 %}
            {% for itemList in group.list %}
                {% assign type2Index = type2Index | plus: 1 %}
                <h4>{{ itemList.title }}</h4>
                <ul class="list">
                    {% assign itemIndex = 0 %}
                    {% for item in itemList.list %}
                    <li>
                        {% assign itemIndex = itemIndex | plus: 1 %}
                            <small>
                            {{ type2Index }}-{{ itemIndex }}. 
                            </small>
                            <a class="post-link"
                                href="{{ site.baseurl }}{{ itemList.basePath }}{{ item.path }}"
                                title="{{ item.title | escape }}"
                                >
                                {{ item.title | escape }}
                            </a>
                        </li>
                    {% endfor %}
                </ul>
            {% endfor %}
        </div>
        {% endif%}
        <!-- end type = 2 -->
        <!-- start type = 3 -->
        {% if group.type == 3 %}
         <div class="site-page-list">
            <legend id="{{ group.title | replace:' ','-' }}">
                <b>{{ group.title }}</b>
            </legend>
             {% assign type3Index = 0 %}
            <ul class="list">
                {% for item in group.list %}
                    <li>
                        {% assign type3Index = type3Index | plus: 1 %}
                            <small>
                                {{ type3Index }}.
                            </small>
                            <a class="post-link"
                                href="{{ site.baseurl }}{{ group.basePath }}{{ item[0] }}"
                                title="{{ item[1] | escape }}"
                                >
                                {{ item[1] | escape }}
                            </a>
                        </li>
                {% endfor %}
            </ul>
        </div>
        {% endif%}
        <!-- end type = 3 -->
    {% endfor %}
</div>
