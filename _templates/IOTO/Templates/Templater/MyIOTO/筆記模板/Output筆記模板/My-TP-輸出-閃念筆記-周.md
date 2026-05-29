<%*
const today = tp.date.now("YYYY-MM-DD");
const monday = tp.date.weekday("YYYY-MM-DD", 0);
const tuesday = tp.date.weekday("YYYY-MM-DD", 1);
const wednesday = tp.date.weekday("YYYY-MM-DD", 2);
const thursday = tp.date.weekday("YYYY-MM-DD", 3);
const friday = tp.date.weekday("YYYY-MM-DD", 4);
const saturday = tp.date.weekday("YYYY-MM-DD", 5);
const sunday = tp.date.weekday("YYYY-MM-DD", 6);
-%>
# 每週閃念

## 週一 <% monday %>
<%* if(today === monday) { _%>
- 
<%* } _%>

## 週二 <% tuesday %>
<%* if(today === tuesday) { _%>
- 
<%* } _%>

## 週三 <% wednesday %>
<%* if(today === wednesday) { _%>
- 
<%* } _%>

## 週四 <% thursday %>
<%* if(today === thursday) { _%>
- 
<%* } _%>

## 週五 <% friday %>
<%* if(today === friday) { _%>
- 
<%* } _%>

## 週六 <% saturday %>
<%* if(today === saturday) { _%>
- 
<%* } _%>

## 週日 <% sunday %>
<%* if(today === sunday) { _%>
- 
<%* } _%>