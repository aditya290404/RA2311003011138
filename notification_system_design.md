# Notification System Design

## Stage 1

### Approach for Priority Inbox Sorting

The goal is to determine the top 'n' most important notifications without relying on database queries, solely operating on the in-memory payload fetched from the API.

#### Priority Logic
1. **Weight**: Notifications have inherent importance based on their type.
   - `Placement` is highest priority (Weight 3).
   - `Result` is medium priority (Weight 2).
   - `Event` is lowest priority (Weight 1).
2. **Recency**: If two notifications share the same weight, the one with the more recent timestamp takes precedence.

#### Algorithm Implementation
1. **Fetch Data**: Retrieve the full list of notifications from the `GET /notifications` endpoint.
2. **Weight Mapping**: Create a dictionary/map assigning integer weights to each notification type to enable mathematical comparison.
3. **Custom Sort Function**: Use the language's native array sorting mechanism with a custom comparator:
   - First, compare the integer weights of `itemA` and `itemB`.
   - If weights are unequal, sort in descending order of weight.
   - If weights are equal, parse the `Timestamp` strings into `Date` objects and sort in descending order of time (newest first).
4. **Slice**: Extract the first 10 items from the sorted array.
5. **Efficiency**: Native array sorting functions generally use efficient algorithms (like TimSort or QuickSort) with $O(N \log N)$ complexity, which is highly optimal for in-memory operations on a limited payload size.
