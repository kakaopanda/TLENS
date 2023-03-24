import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import data1 from "./data.json";

const SearchResultChart2 = () => {
  useEffect(() => {
    // Set up chart
    const root = am5.Root.new("chartdiv");

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // Create series
    const series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8,
      })
    );

    series.get("colors").setAll({
      step: 2,
    });

    series.links.template.set("strength", 0.5);
    const data = data1;
    series.data.setAll([data]);

    series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data1]);

  return <div id="chartdiv"></div>;
};

export default SearchResultChart2;
