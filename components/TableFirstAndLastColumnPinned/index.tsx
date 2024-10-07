import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./Table.style";

interface TableRow {
  [key: string]: string | number;
}

interface TableProps {
  data: TableRow[];
}

export function TableFirstAndLastColumnPinned({ data }: TableProps) {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  // Extract column names dynamically from the first row of data
  const allColumns = useMemo(
    () => (tableData.length > 0 ? Object.keys(tableData[0]) : []),
    [tableData]
  );

  // Identify the fixed columns (first and last)
  const fixedLeftColumn = useMemo(
    () => (allColumns.length > 0 ? [allColumns[0]] : []),
    [allColumns]
  );
  const fixedRightColumn = useMemo(
    () => (allColumns.length > 1 ? [allColumns[allColumns.length - 1]] : []),
    [allColumns]
  );

  // Identify the scrollable middle columns
  const scrollableColumns = useMemo(
    () => allColumns.slice(1, allColumns.length - 1), // Exclude first and last column
    [allColumns]
  );

  const renderTableHeader = useCallback(
    (columns: string[], style: any) => (
      <View style={styles.tableHeader}>
        {columns.map((column, index) => (
          <View key={index} style={style}>
            <Text style={styles.columnHeaderTxt}>
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </Text>
          </View>
        ))}
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Fixed Left Column */}
        <View>
          {renderTableHeader(fixedLeftColumn, styles.columnHeaderName)}
          {tableData.map((item, index) => (
            <View key={index} style={styles.rowContainer}>
              <Text style={styles.columnRowTxtName}>
                {item[fixedLeftColumn[0]]}
              </Text>
            </View>
          ))}
        </View>

        {/* Scrollable Middle Columns */}
        <ScrollView horizontal>
          <View>
            {renderTableHeader(scrollableColumns, styles.columnHeader)}
            {tableData.map((item, index) => (
              <View key={index} style={styles.rowContainer}>
                {scrollableColumns.map((col, colIndex) => (
                  <Text key={colIndex} style={styles.columnRowTxt}>
                    {item[col]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Right Column */}
        <View>
          {renderTableHeader(fixedRightColumn, styles.columnHeaderMargin)}
          {tableData.map((item, index) => (
            <View key={index} style={styles.rowContainer}>
              <Text style={styles.columnRowTxtMargin}>
                {item[fixedRightColumn[0]]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
