# ng-bookworm-challenges

An application containing small challenges to validate learning of core Angular &amp; testing principles

## Event emitters Challenge

Your task is to utilise event emitters in order to:

1. Take the input event value from the search bar component and display it as the h1 text in the header

   - Edit the search-bar component so it outputs an event emitter (handleSearch) (search-bar.component.ts)
   - Edit the search-bar component so it calls this event emitter on input event (search-bar.component.html)
   - Edit the header component so it binds the updateSearchText method to the output handleSearch event (header.component.html)
   - Edit the header component updateSearchText method so it takes a string argument and assigns it to the searchText property (header.component.ts)
   - Edit the header component so it renders the searchText property string as the h1 text (header.component.html)

2. Filter the displayed books based on search text typed into the side panel input field. You will need to:

   - Edit the side-panel component so it outputs an event emitter (handleSearch) (side-panel.component.ts)
   - Edit the side-panel component so it calls this event emitter on input event (side-panel.component.html)
   - Edit the dashboard component so it binds the filterBySearch method to the output handleSearch event (dashboard.component.html)
   - Edit the filterBySearch method to filter books based on whether they contain the searchText argument in the title or description. The search should NOT be case sensitive. (dashboard.component.ts)
   - Edit the dashboard component to display all of the books to begin with and then a filtered list when search text has been input

3. Remove all current filters when the "RESET ALL" button is pressed

   - Edit the side-panel component so it outputs an event emitter (handleResetClick) (side-panel.component.ts)
   - Edit the side-panel component so it calls this event emitter on button click event (side-panel.component.html)
   - Edit the dashboard component so it binds the removeFilters method to the output handleSearch event (dashboard.component.html)
   - Edit the removeFilters method so the user is displayed with the original unfiltered book list (dashboard.component.ts)
   - Find a way of resetting the the input field text when the "RESET ALL" button is clicked
